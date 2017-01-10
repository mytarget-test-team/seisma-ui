'use strict';

import ReactDOM from 'react-dom';
import { createFactory, Component } from 'react';
import { Provider, connect as _connect } from 'react-redux';
import { applyMiddleware, createStore, bindActionCreators } from 'redux';
import { Route, Router, IndexRoute, DefaultRoute, browserHistory } from 'react-router';

import { assert, isSubClass } from '../utils/common';
import { RootComponent, Page, Template } from './view';
import {
    raiseCondition,
    INTERNAL_ERROR_ROUTE,
    NOT_FOUND_ERROR_ROUTE
} from './errors';
import { Engine, createRootReducer, ENGINES_STORAGE } from './engine';


function buildActionObjectFromEngines(engines) {
    let actions = {};

    for (let engine of engines) {
        actions[engine.actionName] = function actionCreator () {
            return engine.callToAction.apply(engine, arguments)
        };
    }

    return actions;
}

function createMapDispatchToPropsFunction(engines = []) {
    /*
        Create mapDispatchToProps function for redux connect.
     */
    return function (dispatch) {
        return {
            actions: bindActionCreators(
                buildActionObjectFromEngines(engines), dispatch
            )
        };
    }
}

function createMapStateToPropsFunction(engines) {
    /*
        Create mapStateToPropsFunction function for redux connect.
     */
    return function (state) {
        let props = {};

        for (let engine of engines) {
            if (engine.hasUniqueState) {

                if (props[engine.componentName] === undefined) {
                    props[engine.componentName] = {};
                }

                let compState = state[engine.componentName];
                props[engine.componentName][engine.stateName] = compState[engine.stateName];
            } else {
                props[engine.stateName] = state[engine.stateName];
            }
        }

        return props
    }
}

function handleErrorDecorator(componentClass) {
    let methodNameList = [
        'render',
        'setState',
        'forceUpdate',
        'componentDidMount',
        'componentWillMount',
        'componentDidUpdate',
        'componentWillUpdate',
        'componentWillUnmount',
        'shouldComponentUpdate',
        'componentWillReceiveProps'
    ];

    function wrapMethod(original) {
        if (original === undefined) {
            return original
        }

        return function () {
            try {
                return original.bind(this)();
            } catch (error) {
                raiseCondition(this, error);
                return null
            }
        }
    }

    for (let methodName of methodNameList) {
        componentClass.prototype[methodName] = wrapMethod(componentClass.prototype[methodName])
    }

}

function configureEnginesDecorator(componentClass, finalEngines) {
    componentClass.prototype.configureEngines = function (engineOptions) {
        let engineClassNames = Object.keys(engineOptions);

        for (let engineClassName of engineClassNames) {
            if (finalEngines[engineClassName] !== undefined) {
                finalEngines[engineClassName].configure(engineOptions[engineClassName]);
            } else {
                throw new Error(
                    `Engine "${engineClassName}" is not connected to "${componentClass.name}"`
                )
            }
        }
    };
}

export function connect(...engines) {
    /*
         Alternative to redux connect function.
         Do connect page component to engines.
     */
    function decorator(component, noRegisterEngines = false) {
        let connectedComponent;

        if (isSubClass(component, Template) || engines.length === 0) {
            noRegisterEngines = true;
        }

        handleErrorDecorator(component);

        if (!noRegisterEngines) {
            let finalEngines = {};

            for (let engine of engines) {
                engine.bindToComponent(component);

                ENGINES_STORAGE.push(engine);
                finalEngines[engine.constructor.name] = engine;
            }

            configureEnginesDecorator(component, finalEngines);

            connectedComponent = _connect(
                createMapStateToPropsFunction(engines),
                createMapDispatchToPropsFunction(engines),
            )(component);
        } else {
            connectedComponent = component;
        }

        if (isSubClass(component, Page)) {
            return function AppConnectedComponentFactory(urlRule, ...childComponents) {
                return new AppConnectedComponent(connectedComponent, urlRule, childComponents)
            }
        }

        return connectedComponent
    }

    if (engines.length > 0) {
        if (engines[0] instanceof Engine) {
            return decorator
        }
        return decorator(engines[0], true)
    }

    return decorator
}


export class PageContainer {
    /*
        Wrapper for page components
     */

    constructor(...appConnectedComponents) {
        let onlyMainPageContains = appConnectedComponents.filter(
            (c) => { return c.urlRule === '/' }
        );

        if (onlyMainPageContains.length === 0) {
            throw new Error('Main page component was not found')
        }

        if (onlyMainPageContains.length > 1) {
            throw new Error('Main page component can be only one')
        }

        this.mainComponent = onlyMainPageContains[0];
        this.appConnectedComponents = appConnectedComponents.filter(
            (c) => { return c.urlRule !== '/' }
        );

        this.notFoundPage = null;
        this.internalErrorPage = null;
    }

    registerNotFoundPage(component) {
        this.notFoundPage = component;
    }

    registerInternalErrorPage(component) {
        this.internalErrorPage = component;
    }

    collectRoutes() {
        /*
            Method is collecting all route objects to root route and returning it
         */
        let routeFactory = createFactory(Route);
        let indexRouteFactory = createFactory(IndexRoute);

        let args = [
            {
                path: '/',
                component: RootComponent
            },
            indexRouteFactory({component: this.mainComponent.connectedComponent})
        ];

        args.push.apply(args, this.appConnectedComponents.map((comp) => {
            return comp.makeRoute()
        }));

        if (this.internalErrorPage) {
            args.push(routeFactory({
                path: INTERNAL_ERROR_ROUTE,
                component: this.internalErrorPage
            }));
        }

        if (this.notFoundPage) {
            args.push(routeFactory({
                path: NOT_FOUND_ERROR_ROUTE,
                component: this.notFoundPage
            }));
        }

        return routeFactory(...args)
    }

}


class AppConnectedComponent {
    /*
        Wrapper for ReactConnected object
     */

    constructor(connectedComponent, urlRule, childComponents = []) {
        this.connectedComponent = connectedComponent;
        this.urlRule = urlRule;
        this.childComponents = childComponents;
    }

    makeRoute() {
        /*
            Method will making routes for connected component and it's children
         */
        assert(this.urlRule, 'Route can not be created without URL rule');

        let routeFactory = createFactory(Route);

        if (this.childComponents.length === 0) {
            return routeFactory({
                path: this.urlRule,
                component: this.connectedComponent
            })
        }

        let indexRouteFactory = createFactory(IndexRoute);

        let args = [
            {
                path: this.urlRule,
                component: RootComponent
            },
            indexRouteFactory({component: this.connectedComponent})
        ];

        for (let children of this.childComponents) {
            args.push(children.makeRoute());
        }

        return routeFactory(...args)
    }

}


export class Application {
    /*
        The main task of class is utilizing built operations
        and prepare provider, store and router component from pages.
     */

    constructor(pageContainer, initialState, middlewareList, engines = []) {
        assert(
            (pageContainer instanceof PageContainer),
            'Page container can be instance of "PageContainer" only'
        );

        this.initialState = initialState;
        this.middlewareList = middlewareList;

        this.pageContainer = pageContainer;

        ENGINES_STORAGE.push(...engines);
    }

    _makeStore() {
        /*
            Configure store and make it.
         */
        return createStore(
            createRootReducer(),
            this.initialState,
            this.middlewareList ? applyMiddleware(...this.middlewareList) : undefined
        )
    }

    makeProvider() {
        /*
            Factory method for creating provider object
         */
        let store = this._makeStore();
        let routerFactory = createFactory(Router);
        let providerFactory = createFactory(Provider);

        return providerFactory({store},
            routerFactory({
                history: browserHistory,
                routes: this.pageContainer.collectRoutes()
            }),
        )
    }

    startListen(rootElementId) {
        /*
            Start listen events on DOM tree component.
         */
        let provider = this.makeProvider();

        function listener() {
            ReactDOM.render(provider, document.getElementById(rootElementId))
        }

        window.addEventListener('load', listener);
    }

}
