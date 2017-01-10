'use strict';

import React from 'react';

import { Module, connect, defaultProp } from '../../core';
import ListWidgetComponent from '../../components/listWidgetComponent';

import FailBuildsWidgetDataEngine from './engine';
import failBuildsWidgetTemplate from './template';


const DEFAULT_MAX_FAIL_BUILDS_ON_WIDGET = 5;


@connect(
    new FailBuildsWidgetDataEngine()
)
export default class FailBuildsWidgetModule extends Module {

    @defaultProp('Fail builds')
    get title() {
        return this.props.title
    }

    @defaultProp(DEFAULT_MAX_FAIL_BUILDS_ON_WIDGET)
    get maxRecords() {
        return this.props.maxRecords
    }

    getData() {
        this.configureEngines({
            FailBuildsWidgetDataEngine: {
                maxRecords: this.maxRecords
            }
        });

        return this.actions.getFailBuildsForWidget()
    }

    render() {
        let listWidgetProps = {
            title: this.title,
            getData: this.getData.bind(this),
            template: failBuildsWidgetTemplate,
            emptyText: 'no fail builds for last time',
            apiState: this.states.widgetFailBuildsDataState
        };

        return <ListWidgetComponent {...listWidgetProps}/>
    }

}
