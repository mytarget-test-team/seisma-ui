'use strict';

import { BaseResourceLoader }  from './client';
import { URLEncode } from '../utils/http';


const URLs = {
    jobList: () => {
        return '/jobs'
    },
    jobByName: (jobName) => {
        return `/jobs/${URLEncode(jobName)}`
    }
};


export class JobListLoader extends BaseResourceLoader {
    /*
     Load job list
     */
    constructor() {
        super([
            'JOB_LIST_REQUEST',
            'JOB_LIST_SUCCESS',
            'JOB_LIST_FAILURE',
        ]);
    }

    load(requestParams) {
        return this.client.startRequest(
            URLs.jobList(), requestParams
        );
    }

}


export class JobByNameLoader extends BaseResourceLoader {
    /*
     Load job by name
     */
    constructor() {
        super([
            'JOB_BY_NAME_REQUEST',
            'JOB_BY_NAME_SUCCESS',
            'JOB_BY_NAME_FAILURE',
        ]);
    }

    load(jobName) {
        return this.client.startRequest(
            URLs.jobByName(jobName),
        );
    }

}
