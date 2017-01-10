'use strict';

import React from 'react';

import { Module, connect, defaultProp, requiredProp } from '../../core';

import ListWidgetComponent from '../../components/listWidgetComponent';

import buildErrorCasesWidgetTemplate from './template';
import BuildErrorCasesWidgetDataEngine from './engine';


const DEFAULT_MAX_CASES_ON_WIDGET = 10;


@connect(
    new BuildErrorCasesWidgetDataEngine()
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

    @defaultProp('Error cases')
    get title() {
        return this.props.title
    }

    @defaultProp(DEFAULT_MAX_CASES_ON_WIDGET)
    get maxRecords() {
        return this.props.maxRecords
    }

    getData() {
        this.configureEngines({
            BuildErrorCasesWidgetDataEngine: {
                maxRecords: this.maxRecords
            }
        });

        this.actions.getErrorCasesForWidget(this.job, this.build);
    }

    render() {
        let listWidgetProps = {
            title: this.title,
            dontShowIfNoContent: true,
            getData: this.getData.bind(this),
            template: buildErrorCasesWidgetTemplate,
            apiState: this.states.widgetErrorCasesDataState
        };

        return <ListWidgetComponent {...listWidgetProps}/>
    }

}