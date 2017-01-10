'use strict';

import { actionName, stateName } from '../../core';
import ApiEngine from '../../api/engine';
import { CaseFromJobLoader } from '../../api/caseResource';


const FIELDS_TO_LOAD = [
    'name',
    'created',
    'description'
];


export default class CaseDetailsWidgetDataEngine extends ApiEngine {
    /*
        Load case from API for widget by name
     */

    constructor() {
        super();

        this.loader = new CaseFromJobLoader()
            .setFieldsToLoad(FIELDS_TO_LOAD);
    }

    @actionName('getCaseByName')
    actionCreator(jobName, caseName) {
        return this.loader.load(jobName, caseName)
    }

    @stateName('caseDetailsWidgetDataState')
    stateCreator(...args) {
        return this.defaultReducer(...args)
    }

}
