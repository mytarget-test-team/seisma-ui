'use strict';

import React from 'react';

import { Module, connect, defaultProp } from '../../core';

import ListWidgetComponent from '../../components/listWidgetComponent';

import casesStatWidgetTemplate from './template';
import CasesFailStatWidgetDataEngine from './engine';


const DEFAULT_MAX_CASES_ON_WIDGET = 10;


@connect(
    new CasesFailStatWidgetDataEngine()
)
export default class CasesStatWidgetModule extends Module {

    @defaultProp('Fail cases stat')
    get title() {
        return this.props.title
    }

    @defaultProp(DEFAULT_MAX_CASES_ON_WIDGET)
    get maxRecords() {
        return this.props.maxRecords
    }

    getData() {
        this.configureEngines({
            CasesFailStatWidgetDataEngine: {
                maxRecords: this.maxRecords
            }
        });

        this.actions.getCasesFailStatForWidget(this.job, this.build);
    }

    render() {
        let listWidgetProps = {
            title: this.title,
            getData: this.getData.bind(this),
            template: casesStatWidgetTemplate,
            apiState: this.states.widgetCasesFailStatDataState
        };

        return <ListWidgetComponent {...listWidgetProps}/>
    }

}