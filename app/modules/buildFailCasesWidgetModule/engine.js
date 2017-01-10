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


export default class BuildFailCasesWidgetDataEngine extends ApiEngine {
    /*
        Engine for filling data into build fail cases widget
     */

    constructor() {
        super();

        this.loader = new CaseResultListFromBuildLoader()
            .setFieldsToLoad(FIELDS_TO_LOAD);
    }

    @actionName('getFailCasesForWidget')
    actionCreator(jobName, buildName) {
        return this.loader.load(jobName, buildName, {
            status: 'failed',
            to: this.config.maxRecords
        })
    }

    @stateName('widgetFailCasesDataState')
    stateCreator(...args) {
        return this.defaultReducer(...args)
    }

}