'use strict';

import ApiEngine from '../../api/engine';
import { actionName, stateName } from '../../core';
import { LastFailedCasesLoader } from '../../api/caseResource';


const FIELDS_TO_LOAD = [
    'id',
    'job',
    'case',
    'date',
    'name'
];


export default class FailCasesWidgetDataEngine extends ApiEngine {
    /*
        Engine for filling data into bad cases widget
     */

    constructor() {
        super();

        this.loader = new LastFailedCasesLoader()
            .setFieldsToLoad(FIELDS_TO_LOAD);
    }

    @actionName('getFailCasesForWidget')
    actionCreator() {
        return this.loader.load({
            to: this.config.maxRecords
        })
    }

    @stateName('widgetFailCasesDataState')
    stateCreator(...args) {
        return this.defaultReducer(...args)
    }

}
