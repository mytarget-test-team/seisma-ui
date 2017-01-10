'use strict';

import React from 'react';

import { Module, connect, defaultProp } from '../../core';
import ListWidgetComponent from '../../components/listWidgetComponent';

import FailCasesWidgetDataEngine from './engine';
import failCasesWidgetTemplate from './template';


const DEFAULT_MAX_FAIL_CASES_ON_WIDGET = 5;


@connect(
    new FailCasesWidgetDataEngine()
)
export default class FailCasesWidgetComponent extends Module {

    @defaultProp('Fail cases')
    get title() {
        return this.props.title
    }

    @defaultProp(DEFAULT_MAX_FAIL_CASES_ON_WIDGET)
    get maxRecords() {
        return this.props.maxRecords
    }

    getData() {
        this.configureEngines({
            FailCasesWidgetDataEngine: {
                maxRecords: this.maxRecords
            }
        });

        return this.actions.getFailCasesForWidget()
    }

    render() {
        let listWidgetProps = {
            title: this.title,
            getData: this.getData.bind(this),
            template: failCasesWidgetTemplate,
            emptyText: 'no fail cases for last time',
            apiState: this.states.widgetFailCasesDataState
        };

        return <ListWidgetComponent {...listWidgetProps}/>
    }

}