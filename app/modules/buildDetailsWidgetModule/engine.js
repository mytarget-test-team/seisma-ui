'use strict';

import { actionName, stateName } from '../../core';
import ApiEngine from '../../api/engine';
import { BuildFromJobByNameLoader } from '../../api/buildResource';


const FIELDS_TO_LOAD = [
    'job',
    'name',
    'date',
    'title',
    'runtime',
    'metadata',
    'fail_count',
    'tests_count',
    'error_count',
    'success_count'
];


export default class BuildDetailInfoWidgetDataEngine extends ApiEngine {
    /*
        Load build from API for widget by name
     */

    constructor() {
        super();

        this.loader = new BuildFromJobByNameLoader()
            .setFieldsToLoad(FIELDS_TO_LOAD);
    }

    @actionName('getBuildByName')
    actionCreator(jobName, buildName) {
        return this.loader.load(jobName, buildName)
    }

    @stateName('buildDetailInfoWidgetDataState')
    stateCreator(...args) {
        return this.defaultReducer(...args)
    }

}
