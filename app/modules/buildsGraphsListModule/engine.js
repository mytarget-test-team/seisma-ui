'use strict';

import ApiEngine from '../../api/engine';
import { actionName, stateName } from '../../core';
import { JobListLoader } from '../../api/jobResource';


const FIELDS_TO_LOAD = [
    'title',
    'last_builds',
    'runtime',
    'was_success'
];


export default class BuildsFromJobsEngine extends ApiEngine {
    /*
     Engine for getting builds data for all jobs
     */

    constructor() {
        super();

        this.loader = new JobListLoader()
            .setFieldsToLoad(FIELDS_TO_LOAD);
    }

    @actionName('getBuildsFromJobs')
    actionCreator() {
        return this.loader.load()
    }

    @stateName('buildsFromJobsDataState')
    stateCreator(...args) {
        return this.defaultReducer(...args)
    }

}
