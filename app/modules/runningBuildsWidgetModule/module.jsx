'use strict';

import React from 'react';

import { Module, connect, defaultProp } from '../../core';

import ListWidgetComponent from '../../components/listWidgetComponent';

import RunningBuildsWidgetDataEngine from './engine';
import runningBuildsWidgetTemplate from './template';


const DEFAULT_MAX_RUNNING_BUILDS_ON_WIDGET = 5;


@connect(
    new RunningBuildsWidgetDataEngine()
)
export default class RunningBuildsWidgetModule extends Module {

    @defaultProp('Running builds')
    get title() {
        return this.props.title
    }

    @defaultProp(DEFAULT_MAX_RUNNING_BUILDS_ON_WIDGET)
    get maxRecords() {
        return this.props.maxRecords
    }

    getData() {
        this.configureEngines({
            RunningBuildsWidgetDataEngine: {
                maxRecords: this.maxRecords
            }
        });

        return this.actions.getRunningBuildsForWidget()
    }

    render() {
        let listWidgetProps = {
            title: this.title,
            emptyText: 'no running builds',
            getData: this.getData.bind(this),
            template: runningBuildsWidgetTemplate,
            apiState: this.states.widgetRunningBuildsDataState
        };

        return <ListWidgetComponent {...listWidgetProps}/>
    }

}
