'use strict';

import { assert } from '../utils/common';
import { objectToGetParamsString } from '../utils/http';


const USE_API_VERSION = 1;
const BASE_API_PATH = '/api';

export const MIDDLEWARE_ACTION_TYPE = 'TRANSFER_MANAGEMENT_FROM_API_CLIENT_TO_MIDDLEWARE';


function createActionForMiddleware(handler, promise) {
    /*
        Create action for handle on middleware
     */
    return {
        type: MIDDLEWARE_ACTION_TYPE,
        payload: promise,
        handler: handler
    };
}


class Pagination {
    /*
        Class implement interface for configure loader request
     */

    constructor(currentPageNum, numRecordsOnPage) {
        this.currentPageNum = parseInt(currentPageNum);
        this.numRecordsOnPage = parseInt(numRecordsOnPage);
    }

    getAvailablePageNum(totalRecords) {
        return Math.ceil(parseInt(totalRecords) / this.numRecordsOnPage);
    }

    getFromToParams() {
        let to = (this.currentPageNum * this.numRecordsOnPage);
        let from = (to + 1) - this.numRecordsOnPage;

        return {from, to}
    }

}


export class BaseResourceLoader {
    /*
        Abstract resource loader.
     */

    constructor(actionTypes) {
        [this.REQUEST, this.SUCCESS, this.FAILURE] = actionTypes;
        this.client = new ApiClient(this);

        this.fields = null;
        this.pagination = null;
    }

    get hasPagination() {
        return (this.pagination instanceof Pagination)
    }

    setFieldsToLoad(fieldsArray) {
        /*
            Set array of strings for get fields of resource from request
         */
        this.fields = fieldsArray;
        return this
    }

    formatObject(resultItem) {
        /*
         Format object from result.
         This is bast practice for data control.
         Just redefine it and return what you need.
         */
        return resultItem;
    }

    formatResult(data, extra) {
        /*
         Format result object.
         This implemented for result object control.
         Just redefine it and return what you need.
         */
        if (this.hasPagination) {
            extra['current_page'] = this.pagination.currentPageNum;
            extra['records_on_page'] = this.pagination.numRecordsOnPage;
            extra['available_pages'] = this.pagination.getAvailablePageNum(extra['total_count']);
        }

        return {result: data, extra: extra};
    }

    withActionTypes(actionTypes) {
        /*
         Use loader with action types
         */
        [this.REQUEST, this.SUCCESS, this.FAILURE] = actionTypes;

        return this;
    }

    withPagination(currentPageNum, numRecordsOnPage) {
        /*
            Make request with pagination data
         */
        this.pagination = new Pagination(currentPageNum, numRecordsOnPage);

        return this
    }

    load() {
        /*
         Abstract method for load resource
         */
        throw new Error(
            'Method "load" does not implemented in resource loader object',
        );
    }

}


export class ApiClient {
    /*
        Object implement interface for communication with seisma API
     */
    constructor(loader, apiVersion) {
        this.loader = loader;
        this.apiVersion = apiVersion || USE_API_VERSION;
    }

    prepareURL(resourcePath, requestParams) {
        /*
            Create URL with contains api version end request params
         */
        let url = BASE_API_PATH + '/v' + this.apiVersion + resourcePath;

        if (requestParams) {
            return url + objectToGetParamsString(requestParams);
        }

        return url;
    }

    getRequestAction() {
        /*
            Get action data when request was started
         */
        return {
            type: this.loader.REQUEST,
            meta: {
                loading: true
            },
        }
    }

    getSuccessAction(json) {
        /*
            Get action data when success was reached
         */
        let data;

        if (json.result instanceof Array) {
            data = json.result.map((i) => {return this.loader.formatObject(i)});
        }
        else {
            data = this.loader.formatObject(json.result);
        }

        return {
            type: this.loader.SUCCESS,
            meta: {
                loading: false
            },
            payload: this.loader.formatResult(data, json.extra)
        }
    }

    getErrorAction(json) {
        /*
            Get action data when error was given
         */
        let type = json ? json.type : 'UnknownError';
        let messages = json ? json.messages : ['Unexpected api error'];

        return {
            type: this.loader.FAILURE,
            meta: {
                loading: false
            },
            error: {
                type: type,
                messages: messages
            }
        };
    }

    startRequest(resourcePath, requestParams) {
        /*
            Function do fetch url and create action for handling on middleware
         */
        assert(this.loader.REQUEST, 'request action type can not be empty in loader resource');
        assert(this.loader.SUCCESS, 'success action type can not be empty in loader resource');
        assert(this.loader.FAILURE, 'failure action type can not be empty in loader resource');

        if (this.loader.hasPagination) {
            requestParams = {...requestParams || {}, ...this.loader.pagination.getFromToParams()}
        }

        if (this.loader.fields instanceof Array && this.loader.fields.length > 0) {
            requestParams = {...requestParams || {}, fields: this.loader.fields.join(',')}
        }

        let requestURL = this.prepareURL(resourcePath, requestParams);

        return createActionForMiddleware(this, fetch(requestURL));
    }

}
