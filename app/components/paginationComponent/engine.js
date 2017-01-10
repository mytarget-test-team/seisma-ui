'use strict';

import Cookies from 'js-cookie';

import { Engine, actionName, stateName } from '../../core';

const DEFAULT_PAGE_NUM = 1;
const DEFAULT_NUM_RECORDS_ON_PAGE = 50;

const PAGINATION_RECORDS_COOKIE_NAME = 'pagination-records';


export class PaginationSettingsEngine extends Engine {
    /*
        Pagination settings control
     */

    constructor(...args) {
        super(...args);

        this.cookies = Cookies.withConverter({
            read: (value) => {
                return value ? parseInt(value) : value
            }
        });

        this.actionType = 'UPDATE_PAGINATION_SETTINGS';
    }

    get hasUniqueState() {
        return false
    }

    get initialState() {
        return {
            page: DEFAULT_PAGE_NUM,
            records: this.getDefaultRecords(),
        }
    }

    getDefaultRecords() {
        let recordsFromCookie = this.cookies.get(PAGINATION_RECORDS_COOKIE_NAME);

        return recordsFromCookie || DEFAULT_NUM_RECORDS_ON_PAGE
    }

    setDefaultRecords(objectToUpdate) {
        if (objectToUpdate.records) {
            this.cookies.set(PAGINATION_RECORDS_COOKIE_NAME, objectToUpdate.records);

            return true
        }

        return false
    }

    @actionName('updatePaginationSettings')
    actionCreator(objectToUpdate, reset = false) {
        this.setDefaultRecords(objectToUpdate);

        return {
            type: this.actionType,
            payload: objectToUpdate,
            meta: {
                reset
            }
        }
    }

    @stateName('paginationSettingsState')
    stateCreator(state, action) {
        if (action.type === this.actionType) {
            if (action.meta.reset) {
                return this.initialState
            }
            return {...state, ...action.payload}
        }
        return state
    }

}
