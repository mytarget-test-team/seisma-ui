'use strict';

import React from 'react';

import { Module, connect, defaultProp, requiredProp } from '../../core';

import ListWidgetComponent from '../../components/listWidgetComponent';

import buildFailCasesWidgetTemplate from './template';
import BuildFailCasesWidgetDataEngine from './engine';


const DEFAULT_MAX_CASES_ON_WIDGET = 10;


@connect(
    new BuildFailCasesWidgetDataEngine()
)
export default class BuildFailCasesWidgetModule extends Module {

    @requiredProp
    get job() {
        return this.props.job
    }

    @requiredProp
    get build() {
        return this.props.build
    }

    @defaultProp('Fail cases')
    get title() {
        return this.props.title
    }

    @defaultProp(DEFAULT_MAX_CASES_ON_WIDGET)
    get maxRecords() {
        return this.props.maxRecords
    }

    getData() {
        this.configureEngines({
            BuildFailCasesWidgetDataEngine: {
                maxRecords: this.maxRecords
            }
        });

        this.actions.getFailCasesForWidget(this.job, this.build);
    }

    render() {
        let listWidgetProps = {
            title: this.title,
            dontShowIfNoContent: true,
            getData: this.getData.bind(this),
            template: buildFailCasesWidgetTemplate,
            apiState: this.states.widgetFailCasesDataState
        };

        return <ListWidgetComponent {...listWidgetProps}/>
    }

}