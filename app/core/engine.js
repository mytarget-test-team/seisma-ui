'use strict';

import { assert, randomUUID } from '../utils/common';


export const ENGINES_STORAGE = [];

const INIT_STATE_ACTION_TYPE = '@@redux/INIT';


function namedLike(name) {
    /*
        Function - decorator.
        It set attribute namedLike to decorated function
     */
    return function (target, key, descriptor) {
        assert(name, '"name" is required param');

        descriptor.value.namedLike = name;
        return descriptor
    }
}

export function stateName(stateName) {
    /*
        Function - decorator.
        Named stateCreator method by default on Engine class object.
     */
    return namedLike(stateName)
}

export function actionName(actionName) {
    /*
         Function - decorator.
         Named actionCreator method by default on Engine class object.
     */
    return namedLike(actionName)
}


export class Engine {
    /*
         Base engine class.
         It implemented interface for relation action to reducer
         and give a chance to use only one call to reducer what
         related to action.
         It made for speed up and user friendly communication.
     */

    constructor(stateName, actionName) {
        this.config = {};
        this.componentName = null;

        this._stateName = stateName;
        this._actionName = actionName;
    }

    static createAdaptor([stateCreator, stateName], [actionCreator, actionName]) {
        /*
            Create adaptor for standard reducer and action function
         */
        return new EngineAdaptor([stateCreator, stateName], [actionCreator, actionName])
    }

    get hasUniqueState() {
        return true
    }

    get initialState() {
        return undefined
    }

    get stateName() {
        /*
            To get stateName from one of those.
         */
        assert(
            this.stateCreator.hasOwnProperty('namedLike') || this._stateName,
            `State name was not found in "${this.constructor.name}"`
        );

        return this._stateName || this.stateCreator.namedLike
    }

    set stateName(value) {
        /*
            To set stateName. Name from decorator will ignored.
         */
        this._stateName = value;
    }

    get actionName() {
        /*
            To get stateName from one of those.
         */
        assert(
            this.actionCreator.hasOwnProperty('namedLike') || this._actionName,
            `Action name was not found in "${this.constructor.name}"`
        );

        return this._actionName || this.actionCreator.namedLike
    }

    set actionName(value) {
        /*
            To set actionName. Name from decorator will ignored.
         */
        this._actionName = value;
    }

    configure(updateData) {
        assert(
            typeof(updateData) === 'object',
            `Incorrect data for configure engine "${this.constructor.name}"`
        );

        this.config = {...this.config, ...updateData};
        return this;
    }

    bindToComponent(reactComponent) {
        /*
             Method make relate to component name.
             State will saved as [componentName][stateName]
         */
        this.componentName = reactComponent.name;
    }

    callToAction(...args) {
        /*
             This is provider for actionCreator method.
             Should call to it for using.
         */
        assert(
            this.stateName,
            'Unknown state name. Should set state name for using'
        );
        if (this.hasUniqueState) {
            assert(
                this.componentName,
                'Unknown component name. Engine did not matched to react component.'
            );
        }

        let userAction = this.actionCreator(...args);

        assert(
            userAction !== undefined,
            'action creator can return object not undefined'
        );
        assert(userAction.type, `Action ${userAction} should contains type`);

        return {...userAction, RELATED_TO_STATE: [this.componentName, this.stateName]}
    }

    makeState(state, action) {
        /*
             This is provider for stateCreator method.
             it will called with self actionCreator for dispatch.
         */
        let userState = this.stateCreator(state || this.initialState, action);

        assert(
            userState !== undefined,
            'state creator can return object not undefined'
        );

        return userState
    }

    actionCreator() {
        /*
            Abstract method for user implementation
         */
        throw new Error(
            `Method "actionCreator" does not implemented in "${this.constructor.name}"`
        );
    }

    stateCreator() {
        /*
            Abstract method for user implementation
         */
        throw new Error(
            `Method "stateCreator" does not implemented in "${this.constructor.name}"`
        );
    }
}


export class EngineAdaptor extends Engine {
    /*
         Adapter interface for action creators
         and reducers of redux standard
     */

    constructor([stateCreator, stateName], [actionCreator, actionName]) {
        assert(
            (typeof actionCreator === 'function'),
            'actionCreator can be function only'
        );
        assert(
            (typeof stateCreator === 'function'),
            'stateCreator can be function only'
        );

        super(stateName || `@@engineAdapter/${randomUUID()}`, actionName);

        this._actionCreator = actionCreator;
        this._stateCreator = stateCreator;
    }

    get hasUniqueState() {
        return false
    }

    actionCreator(...args) {
        return this._actionCreator(...args)
    }

    stateCreator(...args) {
        return this._stateCreator(...args)
    }
}


function initState(state, action, engines) {
    /*
        Init default state.
        Aggregate initial states from all engines to general state.
     */
    if (action.type === INIT_STATE_ACTION_TYPE) {
        for (let componentName of Object.keys(engines)) {
            let componentEngines = engines[componentName];

            for (let stateName of Object.keys(componentEngines)) {
                let componentEngine = componentEngines[stateName];

                if (state[componentName] === undefined) {
                    state[componentName] = {};
                }

                if (componentEngine.hasUniqueState) {
                    state[componentName][stateName] = componentEngine.makeState(undefined, action);
                } else if (!state.hasOwnProperty(stateName)){
                    state[stateName] = componentEngine.makeState(undefined, action);
                }
            }
        }
    }
}

export function createRootReducer(engines = []) {
    /*
        Combine all engines to root reducer
     */
    let finalEngines = {};
    engines = [...engines, ...ENGINES_STORAGE];

    for (let engine of engines) {
        assert(
            (engine instanceof Engine),
            `"${engine}" can be instance of "Engine" only`
        );

        let [componentName, stateName] = [engine.componentName, engine.stateName];

        if (finalEngines[componentName] === undefined) {
            finalEngines[componentName] = {};
        }

        if (finalEngines[componentName][engine.stateName] !== undefined) {
            throw new Error(
                `Root reducer already has state creator for "${engine.stateName}" from "${componentName}" component`
            )
        }

        finalEngines[componentName][engine.stateName] = engine;
    }

    return function rootReducer(state = {}, action) {
        initState(state, action, finalEngines);

        let previousStateForKey;
        let relatedToState = action.RELATED_TO_STATE;

        if (relatedToState === undefined) {
            return {...state}
        }

        let [componentName, stateName] = action.RELATED_TO_STATE;
        let currentEngine = finalEngines[componentName][stateName];

        if (currentEngine.hasUniqueState) {
            previousStateForKey = state[componentName][stateName];
            state[componentName][stateName] = currentEngine.makeState(previousStateForKey, action);
        } else {
            previousStateForKey = state[stateName];
            state[stateName] = currentEngine.makeState(previousStateForKey, action);
        }

        return {...state}
    };
}
