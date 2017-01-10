'use strict';

import { Engine, actionName, stateName } from '../../core';
import formatAndValidateObject from '../../utils/validators';


export class FilterOptionsEngine extends Engine {
    /*
        Filter options control
     */

    constructor(validationSchema = {}) {
        super();

        this.actionType = 'UPDATE_FILTER_OPTIONS';
        this._validationSchema = validationSchema;
    }

    get hasUniqueState() {
        return false
    }

    get initialState() {
        return {}
    }

    get validationSchema() {
        return this.config.validationSchema || this._validationSchema
    }

    @actionName('updateFilterOptions')
    actionCreator(objectToUpdate, reset = false) {
        return {
            type: this.actionType,
            payload: objectToUpdate,
            meta: {
                reset
            }
        }
    }

    @stateName('filterOptionsState')
    stateCreator(state, action) {
        if (action.type === this.actionType) {
            if (action.meta.reset) {
                return this.initialState
            }
            let formattedObject = formatAndValidateObject(
                action.payload, this.validationSchema
            );
            return {...state, ...formattedObject}
        }

        return state
    }

}
