'use strict';

import {actionName, stateName } from '../../core';

import ApiEngine from '../../api/engine';
import { CaseResultByIdLoader } from '../../api/caseResource';


const FIELDS_TO_LOAD = [
    'job',
    'case',
    'name',
    'date',
    'build',
    'title',
    'status',
    'runtime',
    'metadata'
];


export default class CaseResultDetailsWidgetDataEngine extends ApiEngine {

    constructor() {
        super();

        this.loader = new CaseResultByIdLoader()
            .setFieldsToLoad(FIELDS_TO_LOAD);
    }

    @actionName('getCaseResultDetailsData')
    actionCreator(jobName, caseName, resultId) {
        return this.loader.load(jobName, caseName, resultId)
    }

    @stateName('caseResultDetailsDataState')
    stateCreator(...args) {
        return super.defaultReducer(...args)
    }

}
