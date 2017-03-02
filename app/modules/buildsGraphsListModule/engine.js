'use strict';

import ApiEngine from '../../api/engine';
import { actionName, stateName } from '../../core';
import { BuildsByJobsLoader } from '../../api/buildResource';


export default class BuildsByJobsEngine extends ApiEngine {
    /*
     Engine for getting builds data for all jobs
     */

    constructor() {
        super();

        this.loader = new BuildsByJobsLoader();
    }

    @actionName('getBuildsByJobs')
    actionCreator() {
        return this.loader.load({
            builds_limit: this.config.maxBuilds
        })
    }

    @stateName('buildsByJobsDataState')
    stateCreator(...args) {
        return this.defaultReducer(...args)
    }

}
