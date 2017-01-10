'use strict';

import React from 'react';

import { Module, connect, defaultProp, requiredProp } from '../../core';

import ListWidgetComponent from '../../components/listWidgetComponent';

import jobFailBuildsWidgetTemplate from './template';
import JobFailBuildsWidgetDataEngine from './engine';


const DEFAULT_MAX_BUILDS_ON_WIDGET = 5;


@connect(
    new JobFailBuildsWidgetDataEngine()
)
export default class JobFailBuildsWidgetModule extends Module {

    @requiredProp
    get job() {
        return this.props.job
    }

    @defaultProp('Fail builds')
    get title() {
        return this.props.title
    }

    @defaultProp(DEFAULT_MAX_BUILDS_ON_WIDGET)
    get maxRecords() {
        return this.props.maxRecords
    }

    getData() {
        this.configureEngines({
            JobFailBuildsWidgetDataEngine: {
                maxRecords: this.maxRecords
            }
        });

        this.actions.getFailBuildsForWidget(this.job);
    }

    render() {
        let listWidgetProps = {
            title: this.title,
            getData: this.getData.bind(this),
            template: jobFailBuildsWidgetTemplate,
            emptyText: 'no fail builds for last time',
            apiState: this.states.widgetJobFailBuildsDataState
        };

        return <ListWidgetComponent {...listWidgetProps}/>
    }

}