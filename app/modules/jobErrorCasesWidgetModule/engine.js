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


export default class JobErrorCasesWidgetDataEngine extends ApiEngine {

    constructor() {
        super();

        this.loader = new CaseResultListFromJobLoader()
            .setFieldsToLoad(FIELDS_TO_LOAD);
    }

    @actionName('getErrorCasesForWidget')
    actionCreator(jobName) {
        return this.loader.load(jobName, {
            status: 'error',
            to: this.config.maxRecords
        })
    }

    @stateName('widgetJobErrorCasesDataState')
    stateCreator(...args) {
        return this.defaultReducer(...args)
    }

}
