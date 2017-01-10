'use strict';

import React from 'react';

import { Module, connect, defaultProp } from '../../core';

import ListWidgetComponent from '../../components/listWidgetComponent';

import JobsWidgetDataEngine from './engine';
import jobWidgetTemplate from './template';


const DEFAULT_MAX_JOBS_ON_WIDGET = 5;


@connect(
    new JobsWidgetDataEngine()
)
export default class JobsWidgetComponent extends Module {

    @defaultProp('Jobs')
    get title() {
        return this.props.title
    }

    @defaultProp(DEFAULT_MAX_JOBS_ON_WIDGET)
    get maxRecords() {
        return this.props.maxRecords
    }

    getData() {
        this.configureEngines({
            JobsWidgetDataEngine: {
                maxRecords: this.maxRecords
            }
        });

        return this.actions.getJobsForWidget()
    }

    render() {
        let listWidgetProps = {
            title: this.title,
            template: jobWidgetTemplate,
            getData: this.getData.bind(this),
            apiState: this.states.widgetJobsDataState,
            emptyText: 'You are not having jobs. Please, create job with run tests at first time.',
        };

        return <ListWidgetComponent {...listWidgetProps}/>
    }

}