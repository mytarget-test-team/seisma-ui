'use strict';

import React from 'react';

import { Page, connect, requiredProp } from '../core';

import MainMenuModule from '../modules/mainMenuModule';
import JobTabMenuModule from '../modules/jobTabMenuModule';
import JobFailBuildsWidgetModule from '../modules/jobFailBuildsWidgetModule';
import JobBuildsTableListModule from '../modules/jobBuildsTableListModule';
import JobDetailInfoWidgetModule from '../modules/jobDetailInfoWidgetModule';


@connect
export default class JobBuildsPage extends Page {

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
                        <JobFailBuildsWidgetModule job={this.job} maxRecords={5}/>
                    </div>
                    <JobBuildsTableListModule job={this.job} location={this.location}/>
                </div>
            </div>
        )
    }

}
