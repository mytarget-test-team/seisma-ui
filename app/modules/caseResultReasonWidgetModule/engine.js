'use strict';

import {actionName, stateName } from '../../core';

import ApiEngine from '../../api/engine';
import { CaseResultByIdLoader } from '../../api/caseResource';


const FIELDS_TO_LOAD = [
    'reason'
];


export default class CaseResultReasonDataEngine extends ApiEngine {

    constructor() {
        super();

        this.loader = new CaseResultByIdLoader()
            .setFieldsToLoad(FIELDS_TO_LOAD);
    }

    @actionName('getCaseResultReasonData')
    actionCreator(jobName, caseName, resultId) {
        return this.loader.load(jobName, caseName, resultId)
    }

    @stateName('caseResultReasonWidgetDataState')
    stateCreator(...args) {
        return super.defaultReducer(...args)
    }

}
