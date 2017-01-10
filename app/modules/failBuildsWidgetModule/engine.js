'use strict';

import ApiEngine from '../../api/engine';
import { actionName, stateName } from '../../core';
import { LastBadBuildListLoader } from '../../api/buildResource';


const FIELDS_TO_LOAD = [
    'job',
    'name',
    'title',
    'date'
];


export default class FailBuildsWidgetDataEngine extends ApiEngine {
    /*
        Engine for filling data into bad builds widget
     */

    constructor() {
        super();

        this.loader = new LastBadBuildListLoader()
            .setFieldsToLoad(FIELDS_TO_LOAD);
    }

    @actionName('getFailBuildsForWidget')
    actionCreator() {
        return this.loader.load({
            to: this.config.maxRecords
        })
    }

    @stateName('widgetFailBuildsDataState')
    stateCreator(...args) {
        return this.defaultReducer(...args)
    }

}