'use strict';

import {actionName, stateName } from '../../core';

import ApiEngine from '../../api/engine';
import { CaseListFromJobLoader } from '../../api/caseResource';


const DEFAULT_REQUEST_PARAMS = {};

const DEFAULT_PAGE_NUM = 1;
const DEFAULT_NUM_RECORDS_ON_PAGE = 50;

const FIELDS_TO_LOAD = [
    'job',
    'name',
    'created'
];


export default class JobCasesTableDataEngine extends ApiEngine {
    /*
        Load builds from job
     */

    constructor() {
        super();

        this.loader = new CaseListFromJobLoader()
            .setFieldsToLoad(FIELDS_TO_LOAD);
    }

    @actionName('getJobCasesTableData')
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

    @stateName('JobCasesTableDataState')
    stateCreator(...args) {
        return this.defaultReducer(...args)
    }

}