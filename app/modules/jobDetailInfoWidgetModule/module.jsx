'use strict';

import React from 'react';

import { Module, connect, requiredProp, defaultProp } from '../../core';

import DetailInfoWidgetComponent from '../../components/detailInfoWidgetComponent';

import jobDetailInfoWidgetTemplate from './template';
import JobDetailInfoWidgetDataEngine from './engine';


@connect(
    new JobDetailInfoWidgetDataEngine()
)
export default class JobDetailInfoWidgetModule extends Module {

    @requiredProp
    get job() {
        return this.props.job
    }

    @defaultProp('Job details')
    get title() {
        return this.props.title
    }

    getData() {
        this.actions.getJobByName(this.job)
    }

    render() {
        let detailInfoProps = {
            title: this.title,
            emptyText: 'data was not found',
            getData: this.getData.bind(this),
            template: jobDetailInfoWidgetTemplate,
            apiState: this.states.jobDetailInfoWidgetDataState
        };

        return <DetailInfoWidgetComponent {...detailInfoProps}/>
    }
}
