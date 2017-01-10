'use strict';

import ApiEngine from '../../api/engine';
import { actionName, stateName } from '../../core';
import { JobListLoader } from '../../api/jobResource';


const FIELDS_TO_LOAD = [
    'name',
    'title',
    'created'
];


export default class JobsWidgetDataEngine extends ApiEngine {
    /*
        Engine for filling data into jobs widget
     */

    constructor() {
        super();

        this.loader = new JobListLoader()
            .setFieldsToLoad(FIELDS_TO_LOAD);
    }

    @actionName('getJobsForWidget')
    actionCreator() {
        return this.loader.load({
            to: this.config.maxRecords
        })
    }

    @stateName('widgetJobsDataState')
    stateCreator(...args) {
        return this.defaultReducer(...args)
    }

}
