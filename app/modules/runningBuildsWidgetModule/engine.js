'use strict';

import ApiEngine from '../../api/engine';
import { actionName, stateName } from '../../core';
import { RunningBuildListLoader } from '../../api/buildResource';


const FIELDS_TO_LOAD = [
    'job',
    'name',
    'title',
    'date',
    'minutes_ago'
];


export default class RunningBuildsWidgetDataEngine extends ApiEngine {
    /*
        Engine for filling data into running builds widget
     */

    constructor() {
        super();

        this.loader = new RunningBuildListLoader()
            .setFieldsToLoad(FIELDS_TO_LOAD);
    }

    @actionName('getRunningBuildsForWidget')
    actionCreator() {
        return this.loader.load({
            to: this.config.maxRecords
        })
    }

    @stateName('widgetRunningBuildsDataState')
    stateCreator(...args) {
        return this.defaultReducer(...args)
    }

}
