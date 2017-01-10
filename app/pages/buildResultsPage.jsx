'use strict';

import React from 'react';

import { Page, connect, requiredProp } from '../core';

import MainMenuModule from '../modules/mainMenuModule';
import BuildTabMenuModule from '../modules/buildTabMenuModule';
import BuildDetailsWidgetModule from '../modules/buildDetailsWidgetModule';
import BuildFailCasesWidgetModule from '../modules/buildFailCasesWidgetModule';
import BuildErrorCasesWidgetModule from '../modules/buildErrorCasesWidgetModule';
import BuildResultsTableListModule from '../modules/buildResultsTableListModule';


@connect
export default class BuildResultsPage extends Page {

    @requiredProp
    get job() {
        return this.params.job
    }

    @requiredProp
    get build() {
        return this.params.build
    }

    @requiredProp
    get location() {
        return this.props.location
    }

    render() {
        return (
            <div className="page-container">
                <MainMenuModule/>
                <BuildTabMenuModule job={this.job} build={this.build}/>
                <div className="content">
                    <div className="widget__wrapper-row">
                        <BuildDetailsWidgetModule job={this.job} build={this.build}/>
                        <BuildFailCasesWidgetModule job={this.job} build={this.build} maxRecords={10}/>
                        <BuildErrorCasesWidgetModule job={this.job} build={this.build} maxRecords={10}/>
                    </div>
                    <BuildResultsTableListModule
                        job={this.job}
                        build={this.build}
                        location={this.location}
                    />
                </div>
            </div>
        )
    }

}

