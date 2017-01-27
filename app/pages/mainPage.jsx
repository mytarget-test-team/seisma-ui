'use strict';

import React from 'react';

import { Page, connect } from '../core';

import MainMenuModule from '../modules/mainMenuModule';
import PageTitleModule from '../modules/pageTitleModule';

import JobsWidgetModule from '../modules/jobsWidgetModule';
import CasesStatWidgetModule from '../modules/casesStatWidgetModule';
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
                    <JobsWidgetModule maxRecords={5}/>
                    <RunningBuildsWidgetModule maxRecords={5}/>
                    <FailBuildsWidgetModule maxRecords={5}/>
                    <CasesStatWidgetModule maxRecords={5}/>
                </div>
            </div>
        )
    }

}
