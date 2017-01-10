'use strict';

import {actionName, stateName } from '../../core';
import ApiEngine from '../../api/engine';
import { BuildsListFromJobLoader } from '../../api/buildResource';


const DEFAULT_REQUEST_PARAMS = {};

const DEFAULT_PAGE_NUM = 1;
const DEFAULT_NUM_RECORDS_ON_PAGE = 50;

const FIELDS_TO_LOAD = [
    'job',
    'name',
    'date',
    'title',
    'runtime',
    'fail_count',
    'tests_count',
    'error_count',
    'was_success',
    'success_count'
];


export default class JobBuildsTableDataEngine extends ApiEngine {
    /*
        Load builds from job
     */

    constructor() {
        super();

        this.loader = new BuildsListFromJobLoader();
        this.loader.setFieldsToLoad(FIELDS_TO_LOAD);
    }

    @actionName('getJobBuildsTableData')
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

    @stateName('jobBuildsTableDataState')
    stateCreator(...args) {
        return this.defaultReducer(...args)
    }

}