'use strict';

import React from 'react';

import { Page, requiredProp, connect } from '../core';

import MainMenuModule from '../modules/mainMenuModule';
import CaseResultTabMenuModule from '../modules/caseResultTabMenuModule';
import CaseResultReasonWidgetModule from '../modules/caseResultReasonWidgetModule';
import CaseResultDetailsWidgetModule from '../modules/caseResultDetailsWidgetModule';


@connect
export default class CaseResultPage extends Page {

    @requiredProp
    get job() {
        return this.params.job
    }

    @requiredProp
    get case() {
        return this.params.case
    }

    @requiredProp
    get result() {
        return this.params.result
    }

    render() {
        return (
            <div className="page-container">
                <MainMenuModule/>
                <CaseResultTabMenuModule
                    job={this.job}
                    case={this.case}
                    result={this.result}
                />
                <div className="content">
                    <div className="widget__wrapper-row">
                        <CaseResultDetailsWidgetModule
                            job={this.job}
                            case={this.case}
                            result={this.result}
                        />
                    </div>
                    <div className="widget__wrapper-row">
                        <CaseResultReasonWidgetModule
                            job={this.job}
                            case={this.case}
                            result={this.result}
                        />
                    </div>
                </div>
            </div>
        )
    }

}
