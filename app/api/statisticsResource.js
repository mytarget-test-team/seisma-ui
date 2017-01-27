'use strict';

import { BaseResourceLoader }  from './client';


const URLs = {
    casesFails: () => '/statistics/cases/fails'
};


export class StatisticsByFailsOfCasesLoader extends BaseResourceLoader {
    /*
        Load load statistics by fails of cases
     */
    constructor() {
        super([
            'STATISTICS_BY_FAILS_OF_CASES_REQUEST',
            'STATISTICS_BY_FAILS_OF_CASES_SUCCESS',
            'STATISTICS_BY_FAILS_OF_CASES_FAILURE',
        ]);
    }

    load(requestParams) {
        return this.client.startRequest(
            URLs.casesFails(), requestParams
        );
    }

}
