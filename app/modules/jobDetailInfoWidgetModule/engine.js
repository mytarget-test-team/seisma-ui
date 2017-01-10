'use strict';

import { actionName, stateName } from '../../core';
import ApiEngine from '../../api/engine';
import { JobByNameLoader } from '../../api/jobResource';


const FIELDS_TO_LOAD = [
    'title',
    'created',
    'description',
    'total_cases',
    'total_builds'
];


export default class JobDetailInfoWidgetDataEngine extends ApiEngine {
    /*
        Load job from API for widget by name
     */

    constructor() {
        super();

        this.loader = new JobByNameLoader()
            .setFieldsToLoad(FIELDS_TO_LOAD);
    }

    @actionName('getJobByName')
    actionCreator(jobName) {
        return this.loader.load(jobName)
    }

    @stateName('jobDetailInfoWidgetDataState')
    stateCreator(...args) {
        return this.defaultReducer(...args)
    }

}
