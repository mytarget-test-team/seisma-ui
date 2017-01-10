'use strict';

import ApiEngine from '../../api/engine';
import { actionName, stateName } from '../../core';
import { CaseResultListFromJobLoader } from '../../api/caseResource';


const FIELDS_TO_LOAD = [
    'id',
    'job',
    'case',
    'name',
    'runtime',
];


export default class JobFailCasesWidgetDataEngine extends ApiEngine {

    constructor() {
        super();

        this.loader = new CaseResultListFromJobLoader()
            .setFieldsToLoad(FIELDS_TO_LOAD);
    }

    @actionName('getFailCasesForWidget')
    actionCreator(jobName) {
        return this.loader.load(jobName, {
            status: 'failed',
            to: this.config.maxRecords
        })
    }

    @stateName('widgetJobFailCasesDataState')
    stateCreator(...args) {
        return this.defaultReducer(...args)
    }

}
