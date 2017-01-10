'use strict';

import React from 'react';

import { Module, connect, defaultProp, requiredProp } from '../../core';

import ListWidgetComponent from '../../components/listWidgetComponent';

import jobFailCasesWidgetTemplate from './template';
import JobFailCasesWidgetDataEngine from './engine';


const DEFAULT_MAX_CASES_ON_WIDGET = 5;


@connect(
    new JobFailCasesWidgetDataEngine()
)
export default class JobFailCasesWidgetModule extends Module {

    @requiredProp
    get job() {
        return this.props.job
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
            JobFailCasesWidgetDataEngine: {
                maxRecords: this.maxRecords
            }
        });

        this.actions.getFailCasesForWidget(this.job);
    }

    render() {
        let listWidgetProps = {
            title: this.title,
            getData: this.getData.bind(this),
            template: jobFailCasesWidgetTemplate,
            emptyText: 'no fail cases for last time',
            apiState: this.states.widgetJobFailCasesDataState
        };

        return <ListWidgetComponent {...listWidgetProps}/>
    }

}