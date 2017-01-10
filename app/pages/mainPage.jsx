'use strict';

import React from 'react';

import { Page, connect } from '../core';

import MainMenuModule from '../modules/mainMenuModule';
import PageTitleModule from '../modules/pageTitleModule';

import JobsWidgetModule from '../modules/jobsWidgetModule';
import FailCasesWidgetModule from '../modules/failCasesWidgetModule';
import FailBuildsWidgetModule from '../modules/failBuildsWidgetModule';
import RunningBuildsWidgetModule from '../modules/runningBuildsWidgetModule';


@connect
export default class MainPage extends Page {

    render() {
        return (
            <div className="page-container page-container_main">
                <MainMenuModule/>
                <PageTitleModule title="For today"/>
                <div className="content">
                    <RunningBuildsWidgetModule maxRecords={5}/>
                    <FailBuildsWidgetModule maxRecords={5}/>
                    <FailCasesWidgetModule maxRecords={5}/>
                    <JobsWidgetModule maxRecords={5}/>
                </div>
            </div>
        )
    }

}
