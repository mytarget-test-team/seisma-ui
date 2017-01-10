'use strict';

import { BaseResourceLoader }  from './client';
import { URLEncode } from '../utils/http';


const URLs = {
    caseFromJob: (jobName, caseName) => {
        return `/jobs/${URLEncode(jobName)}/cases/${caseName}`
    },
    casesFromJob: (jobName) => {
        return `/jobs/${URLEncode(jobName)}/cases`
    },
    statByOnlyOneCaseFromJob: (jobName, caseName) => {
        return `/jobs/${URLEncode(jobName)}/cases/${URLEncode(caseName)}/stat`
    },
    caseResultsFromBuild: (jobName, buildName) => {
        return `/jobs/${URLEncode(jobName)}/builds/${URLEncode(buildName)}/cases`
    },
    caseResultFromBuild: (jobName, buildName, caseName) => {
        return `/jobs/${URLEncode(jobName)}/builds/${URLEncode(buildName)}/cases/${URLEncode(caseName)}`
    },
    statByCasesFromJob: (jobName) => {
        return `/jobs/${URLEncode(jobName)}/cases/stat`
    },
    lastBadCases: () => {
        return '/dashboard/cases/bad'
    },
    caseResultById: (jobName, caseName, resultId) => {
        return `/jobs/${URLEncode(jobName)}/cases/${URLEncode(caseName)}/stat/${resultId}`
    }
};


export class CaseFromJobLoader extends BaseResourceLoader {
    /*
     Load only one case from job
     */
    constructor() {
        super([
            'CASE_FROM_JOB_REQUEST',
            'CASE_FROM_JOB_SUCCESS',
            'CASE_FROM_JOB_FAILURE',
        ]);
    }

    load(jobName, caseName) {
        return this.client.startRequest(
            URLs.caseFromJob(jobName, caseName),
        );
    }

}


export class CaseListFromJobLoader extends BaseResourceLoader {
    /*
     Load case list from job
     */
    constructor() {
        super([
            'CASE_LIST_FROM_JOB_REQUEST',
            'CASE_LIST_FROM_JOB_SUCCESS',
            'CASE_LIST_FROM_JOB_FAILURE',
        ]);
    }

    load(jobName, requestParams) {
        return this.client.startRequest(
            URLs.casesFromJob(jobName), requestParams
        );
    }

}


export class CaseResultListFromJobByCaseLoader extends BaseResourceLoader {
    /*
        Load case result list by case.
        That's statistics by a one case only.
     */
    constructor() {
        super([
            'CASE_RESULT_LIST_FROM_JOB_BY_CASE_REQUEST',
            'CASE_RESULT_LIST_FROM_JOB_BY_CASE_SUCCESS',
            'CASE_RESULT_LIST_FROM_JOB_BY_CASE_FAILURE',
        ]);
    }

    load(jobName, caseName, requestParams) {
        return this.client.startRequest(
            URLs.statByOnlyOneCaseFromJob(jobName, caseName), requestParams
        );
    }

}


export class CaseResultListFromJobLoader extends BaseResourceLoader {
    /*
        Load case result list from job
     */
    constructor() {
        super([
            'CASE_RESULT_LIST_FROM_JOB_REQUEST',
            'CASE_RESULT_LIST_FROM_JOB_SUCCESS',
            'CASE_RESULT_LIST_FROM_JOB_FAILURE',
        ]);
    }

    load(jobName, requestParams) {
        return this.client.startRequest(
            URLs.statByCasesFromJob(jobName), requestParams
        );
    }

}


export class CaseResultListFromBuildLoader extends BaseResourceLoader {
    /*
     Load case result list from build
     */
    constructor() {
        super([
            'CASE_RESULT_LIST_FROM_BUILD_REQUEST',
            'CASE_RESULT_LIST_FROM_BUILD_SUCCESS',
            'CASE_RESULT_LIST_FROM_BUILD_FAILURE',
        ]);
    }

    load(jobName, buildName, requestParams) {
        return this.client.startRequest(
            URLs.caseResultsFromBuild(jobName, buildName), requestParams
        );
    }

}


export class CaseResultFromBuildByNameLoader extends BaseResourceLoader {
    /*
        Load only one case result from build
     */
    constructor() {
        super([
            'CASE_RESULT_FROM_BUILD_BY_NAME_REQUEST',
            'CASE_RESULT_FROM_BUILD_BY_NAME_SUCCESS',
            'CASE_RESULT_FROM_BUILD_BY_NAME_FAILURE',
        ]);
    }

    load(jobName, buildName, caseName, requestParams) {
        return this.client.startRequest(
            URLs.caseResultFromBuild(jobName, buildName, caseName), requestParams
        );
    }

}


export class LastFailedCasesLoader extends BaseResourceLoader {
    /*
        Load last failed or error cases from all jobs
     */
    constructor() {
        super([
            'LAST_FAILED_CASES_REQUEST',
            'LAST_FAILED_CASES_SUCCESS',
            'LAST_FAILED_CASES_FAILURE',
        ]);
    }

    load(requestParams) {
        return this.client.startRequest(
            URLs.lastBadCases(), requestParams
        );
    }

}


export class CaseResultByIdLoader extends BaseResourceLoader {
    /*
        Load only one case result by id.
        Should know job name and case name also.
     */
    constructor() {
        super([
            'CASE_RESULT_BY_ID_REQUEST',
            'CASE_RESULT_BY_ID_SUCCESS',
            'CASE_RESULT_BY_ID_FAILURE',
        ]);
    }

    load(jobName, caseName, resultId) {
        return this.client.startRequest(
            URLs.caseResultById(jobName, caseName, resultId)
        );
    }

}
