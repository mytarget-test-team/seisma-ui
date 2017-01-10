'use strict';

import ApiEngine from '../../api/engine';
import { actionName, stateName } from '../../core';
import { BuildsListFromJobLoader } from '../../api/buildResource';


const FIELDS_TO_LOAD = [
    'job',
    'name',
    'title',
    'date'
];


export default class JobFailBuildsWidgetDataEngine extends ApiEngine {

    constructor() {
        super();

        this.loader = new BuildsListFromJobLoader()
            .setFieldsToLoad(FIELDS_TO_LOAD);
    }

    @actionName('getFailBuildsForWidget')
    actionCreator(jobName) {
        return this.loader.load(jobName, {
            was_success: 'false',
            to: this.config.maxRecords
        })
    }

    @stateName('widgetJobFailBuildsDataState')
    stateCreator(...args) {
        return this.defaultReducer(...args)
    }

}
