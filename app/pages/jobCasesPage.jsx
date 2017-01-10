'use strict';

import React from 'react';

import { Page, connect, requiredProp } from '../core';

import MainMenuModule from '../modules/mainMenuModule';
import JobTabMenuModule from '../modules/jobTabMenuModule';
import JobCasesTableListModule from '../modules/jobCasesTableListModule';
import JobFailCasesWidgetModule from '../modules/jobFailCasesWidgetModule';
import JobDetailInfoWidgetModule from '../modules/jobDetailInfoWidgetModule';
import JobErrorCasesWidgetModule from '../modules/jobErrorCasesWidgetModule';


@connect
export default class JobCasesPage extends Page {

    @requiredProp
    get job() {
        return this.params.job
    }

    render() {
        return (
            <div className="page-container">
                <MainMenuModule/>
                <JobTabMenuModule job={this.job}/>
                <div className="content">
                    <div className="widget__wrapper-row">
                        <JobDetailInfoWidgetModule job={this.job}/>
                        <JobErrorCasesWidgetModule job={this.job} maxRecords={5}/>
                        <JobFailCasesWidgetModule job={this.job} maxRecords={5}/>
                    </div>
                    <JobCasesTableListModule job={this.job} location={this.location}/>
                </div>
            </div>
        )
    }

}
