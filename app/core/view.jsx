'use strict';

import React from 'react';
import { createFactory, Component as ReactComponent } from 'react';


export function requiredProp(target, key, descriptor) {

    let wrappedFunc = descriptor.get;

    descriptor.get = function () {
        let result = wrappedFunc.bind(this)();

        if (result === undefined) {
            throw new Error(`"${target.constructor.name}.${key}" is required prop.`)
        }

        return result
    };

    return descriptor
}

export function typedProp(type) {
    return function(target, key, descriptor) {

        let wrappedFunc = descriptor.get;

        descriptor.get = function () {
            let result = wrappedFunc.bind(this)();
            let currentType = typeof(result);

            if (currentType !== type) {
                throw new Error(
                    `"${target.constructor.name}.${key}" can be type of "${type}" only. Got type "${currentType}".`
                )
            }

            return result
        };

        return descriptor
    }
}

export function defaultProp(defaultValue) {
    return function (target, key, descriptor) {

        let wrappedFunc = descriptor.get;

        descriptor.get = function () {
            let result = wrappedFunc.bind(this)();

            if (result === undefined) {
                return defaultValue
            }

            return result
        };

        return descriptor
    }
}

function createStateGetter(component) {
    return new Proxy(component, {

        get(target, name) {
            let props = target.props || {};
            let states = props[target.constructor.name] || {};

            return states[name] || props[name] || {};
        }

    })
}


export class RootComponent extends ReactComponent {
    /*
        General container for all pages
     */

    render() {
        let containerFactory = createFactory(this.props.children.type);

        return containerFactory({
            params: this.props.params,
            location: this.props.location
        })
    }

}


export class Page extends ReactComponent {
    /*
         Base page class.
         Give a chance to get self state from states descriptor.
     */

    static get contextTypes() {
        return {
            router: React.PropTypes.object.isRequired
        }
    }

    constructor(...args) {
        super(...args);

        this.states = createStateGetter(this)
    }

    @requiredProp
    get params() {
        return this.props.params
    }

    @requiredProp
    get router() {
        return this.context.router
    }

    @requiredProp
    get location() {
        return this.props.location
    }

    get actions() {
        return this.props.actions || {}
    }

    configureEngines() {
        throw new Error(
            `Method "configureEngines" not implemented in "${this.constructor.name}"`
        )
    }

}


export class Module extends ReactComponent {
    /*
        Base class for page components
     */

    static get contextTypes() {
        return {
            router: React.PropTypes.object.isRequired
        }
    }

    constructor(...args) {
        super(...args);

        this.states = createStateGetter(this)
    }

    @requiredProp
    get router() {
        return this.context.router
    }

    get actions() {
        return this.props.actions || {}
    }

    configureEngines() {
        throw new Error(
            `Method "configureEngines" not implemented in "${this.constructor.name}"`
        )
    }

}


export class Component extends Module {}


export class Template extends ReactComponent {
    /*
        Base template class
     */

    static get contextTypes() {
        return {
            router: React.PropTypes.object.isRequired
        }
    }

    get actions() {
        return this.props.actions || {}
    }

    renderError(error) {
        let errorType = <p className="error__type">{error.type}</p>;
        let errorList = (
            <ul className="error__list">
                {
                    error.messages.map((m, i) => {
                        return (
                            <li key={`error_item_${i}`}>{m}</li>
                        )
                    })
                }
            </ul>
        );

        return (
            <div className="error">
                {errorType}
                {errorList}
            </div>
        )
    }

}
