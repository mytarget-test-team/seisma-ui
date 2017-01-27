'use strict';

import ApiEngine from '../../api/engine';
import { actionName, stateName } from '../../core';
import { StatisticsByFailsOfCasesLoader } from '../../api/statisticsResource';


export default class CasesFailStatWidgetDataEngine extends ApiEngine {
    /*
        Engine for filling data into cases stat widget
     */

    constructor() {
        super();

        this.loader = new StatisticsByFailsOfCasesLoader();
    }

    @actionName('getCasesFailStatForWidget')
    actionCreator(jobName, buildName) {
        return this.loader.load({
            to: this.config.maxRecords
        })
    }

    @stateName('widgetCasesFailStatDataState')
    stateCreator(...args) {
        return this.defaultReducer(...args)
    }

}