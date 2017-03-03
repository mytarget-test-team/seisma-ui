'use strict';

import { BaseResourceLoader }  from './client';
import { URLEncode } from '../utils/http';
import { calcTimeDiffByMinutesFromDate } from '../utils/date';


const URLs = {
    runningBuilds: () => {
        return '/dashboard/builds/running'
    },
    listBuildsFromJob: (jobName) => {
        return `/jobs/${URLEncode(jobName)}/builds`
    },
    oneBuildByNameFromJob: (jobName, buildName) => {
        return `/jobs/${URLEncode(jobName)}/builds/${URLEncode(buildName)}`
    },
    badBuilds: () => {
        return '/dashboard/builds/bad'
    }
};


export class RunningBuildListLoader extends BaseResourceLoader {
    /*
        Load running builds only
     */
    constructor() {
        super([
            'RUNNING_BUILDS_REQUEST',
            'RUNNING_BUILDS_SUCCESS',
            'RUNNING_BUILDS_FAILURE',
        ]);
    }

    formatObject(build) {
        if (!this.fields || (this.fields.includes('minutes_ago') && 'date' in build)) {
            build['minutes_ago'] = calcTimeDiffByMinutesFromDate(build.date);
        }

        return build;
    }

    load(requestParams) {
        return this.client.startRequest(
            URLs.runningBuilds(), requestParams,
        );
    }

}


export class BuildFromJobByNameLoader extends BaseResourceLoader {
    /*
        Load one build from job bu name.
        Should know job name, also.
     */
    constructor() {
        super([
            'BUILD_FROM_JOB_BY_NAME_REQUEST',
            'BUILD_FROM_JOB_BY_NAME_SUCCESS',
            'BUILD_FROM_JOB_BY_NAME_FAILURE',
        ]);
    }

    load(jobName, buildName, requestParams) {
        return this.client.startRequest(
            URLs.oneBuildByNameFromJob(jobName, buildName), requestParams,
        );
    }

}


export class BuildsListFromJobLoader extends BaseResourceLoader {
    /*
        Load builds list from job.
        Should know job name, also.
     */
    constructor() {
        super([
            'BUILDS_LIST_FROM_JOB_REQUEST',
            'BUILDS_LIST_FROM_JOB_SUCCESS',
            'BUILDS_LIST_FROM_JOB_FAILURE',
        ]);
    }

    load(jobName, requestParams) {
        return this.client.startRequest(
            URLs.listBuildsFromJob(jobName), requestParams,
        );
    }

}


export class LastBadBuildListLoader extends BaseResourceLoader {
    /*
        Load last bad builds for all jobs.
     */
    constructor() {
        super([
            'BAD_BUILDS_REQUEST',
            'BAD_BUILDS_SUCCESS',
            'BAD_BUILDS_FAILURE',
        ]);
    }

    load(requestParams) {
        return this.client.startRequest(
            URLs.badBuilds(), requestParams,
        )
    }
}
