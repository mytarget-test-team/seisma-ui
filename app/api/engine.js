'use strict';

import { Engine } from '../core';
import { assert } from '../utils/common';
import { BaseResourceLoader } from './client';


export default class ApiEngine extends Engine {

    constructor(...args) {
        super(...args);

        this.loader = null;
    }

    get initialState() {
        return {
            data: null,
            error: null,
            meta: null,
            loading: false
        }
    }

    callToAction(...args) {
        assert(
            (this.loader !== null && this.loader instanceof BaseResourceLoader),
            `API resource loader was not initialized in "${this.constructor.name}" engine`
        );

        return super.callToAction(...args)
    }

    defaultReducer(state, action) {
        switch (action.type) {
            case this.loader.REQUEST:
                return {...state,
                    data: null,
                    error: null,
                    meta: null,
                    loading: action.meta.loading
                };
            case this.loader.SUCCESS:
                return {...state,
                    data: action.payload.result,
                    error: null,
                    meta: action.payload.extra,
                    loading: action.meta.loading
                };
            case this.loader.FAILURE:
                return {...state,
                    data: null,
                    error: action.error,
                    meta: null,
                    loading: action.meta.loading
                };
            default:
                return state
        }
    }

}
