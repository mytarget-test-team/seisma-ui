'use strict';

import React from 'react';

import { Page, connect, requiredProp } from '../core';

import MainMenuModule from '../modules/mainMenuModule';
import CaseDetailsWidgetModule from '../modules/caseDetailsWidgetModule';
import CaseResultsTabMenuModule from '../modules/caseResultsTabMenuModule';
import CaseResultsTableListModule from '../modules/caseResultsTableListModule';


@connect
export default class CaseResultsPage extends Page {

    @requiredProp
    get job() {
        return this.params.job
    }

    @requiredProp
    get case() {
        return this.params.case
    }

    render() {
        return (
            <div className="page-container">
                <MainMenuModule/>
                <CaseResultsTabMenuModule job={this.job} case={this.case}/>
                <div className="content">
                    <div className="widget__wrapper-row">
                        <CaseDetailsWidgetModule
                            job={this.job}
                            case={this.case}
                        />
                    </div>
                    <CaseResultsTableListModule
                        job={this.job}
                        case={this.case}
                        location={this.location}
                    />
                </div>
            </div>
        )
    }

}
