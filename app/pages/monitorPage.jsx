'use strict';

import React from 'react';

import { Page, connect } from '../core';

import MainMenuModule from '../modules/mainMenuModule';
import PageTitleModule from '../modules/pageTitleModule';

import CasesStatWidgetModule from '../modules/casesStatWidgetModule';
import RunningBuildsWidgetModule from '../modules/runningBuildsWidgetModule';
import BuildsGraphsListModule from '../modules/buildsGraphsListModule';


@connect
export default class MonitorPage extends Page {

    render() {
        return (
            <div className="page-container page-container_main">
                <MainMenuModule/>
                <PageTitleModule title="For today"/>
                <div className="content">
                    <RunningBuildsWidgetModule maxRecords={5}/>
                    <CasesStatWidgetModule maxRecords={5}/>
                    <BuildsGraphsListModule/>
                </div>
            </div>
        )
    }

}
