'use strict';

import React from 'react';

import { Module, connect, defaultProp, requiredProp } from '../../core';

import ListWidgetComponent from '../../components/listWidgetComponent';

import jobErrorCasesWidgetTemplate from './template';
import JobErrorCasesWidgetDataEngine from './engine';


const DEFAULT_MAX_CASES_ON_WIDGET = 5;


@connect(
    new JobErrorCasesWidgetDataEngine()
)
export default class JobErrorCasesWidgetModule extends Module {

    @requiredProp
    get job() {
        return this.props.job
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
            JobErrorCasesWidgetDataEngine: {
                maxRecords: this.maxRecords
            }
        });

        this.actions.getErrorCasesForWidget(this.job);
    }

    render() {
        let listWidgetProps = {
            title: this.title,
            getData: this.getData.bind(this),
            template: jobErrorCasesWidgetTemplate,
            emptyText: 'no error cases for last time',
            apiState: this.states.widgetJobErrorCasesDataState
        };

        return <ListWidgetComponent {...listWidgetProps}/>
    }

}