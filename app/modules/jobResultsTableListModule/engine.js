'use strict';

import {actionName, stateName } from '../../core';

import ApiEngine from '../../api/engine';
import { CaseResultListFromJobLoader } from '../../api/caseResource';


const DEFAULT_REQUEST_PARAMS = {};

const DEFAULT_PAGE_NUM = 1;
const DEFAULT_NUM_RECORDS_ON_PAGE = 50;

const FIELDS_TO_LOAD = [
    'id',
    'job',
    'case',
    'name',
    'date',
    'status',
    'runtime'
];


export default class JobResultsTableDataEngine extends ApiEngine {

    constructor() {
        super();

        this.loader = new CaseResultListFromJobLoader()
            .setFieldsToLoad(FIELDS_TO_LOAD);
    }

    @actionName('getJobResultsTableData')
    actionCreator(
        jobName,
        changeURLCallback = () => {},
        currentPageNum = DEFAULT_PAGE_NUM,
        numRecordsOnPage = DEFAULT_NUM_RECORDS_ON_PAGE,
        requestParams = DEFAULT_REQUEST_PARAMS
    ) {
        changeURLCallback();

        return this.loader
            .withPagination(
                currentPageNum, numRecordsOnPage
            )
            .load(jobName, requestParams)
    }

    @stateName('jobResultsTableDataState')
    stateCreator(...args) {
        return this.defaultReducer(...args)
    }

}
