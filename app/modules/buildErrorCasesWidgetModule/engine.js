'use strict';

import ApiEngine from '../../api/engine';
import { actionName, stateName } from '../../core';
import { CaseResultListFromBuildLoader } from '../../api/caseResource';


const FIELDS_TO_LOAD = [
    'id',
    'job',
    'case',
    'name',
    'runtime'
];


export default class BuildErrorCasesWidgetDataEngine extends ApiEngine {
    /*
        Engine for filling data into build error cases widget
     */

    constructor() {
        super();

        this.loader = new CaseResultListFromBuildLoader()
            .setFieldsToLoad(FIELDS_TO_LOAD);
    }

    @actionName('getErrorCasesForWidget')
    actionCreator(jobName, buildName) {
        return this.loader.load(jobName, buildName, {
            status: 'error',
            to: this.config.maxRecords
        })
    }

    @stateName('widgetErrorCasesDataState')
    stateCreator(...args) {
        return this.defaultReducer(...args)
    }

}