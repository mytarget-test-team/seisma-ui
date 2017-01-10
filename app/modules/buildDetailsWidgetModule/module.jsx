'use strict';

import React from 'react';

import { Module, connect, requiredProp, defaultProp } from '../../core';

import DetailInfoWidgetComponent from '../../components/detailInfoWidgetComponent';

import buildDetailInfoWidgetTemplate from './template';
import BuildDetailInfoWidgetDataEngine from './engine';


@connect(
    new BuildDetailInfoWidgetDataEngine()
)
export default class BuildDetailsWidgetModule extends Module {

    @requiredProp
    get job() {
        return this.props.job
    }

    @requiredProp
    get build() {
        return this.props.build
    }

    @defaultProp('Build details')
    get title() {
        return this.props.title
    }

    getData() {
        this.actions.getBuildByName(this.job, this.build)
    }

    render() {
        let detailInfoProps = {
            title: this.title,
            emptyText: 'data was not found',
            getData: this.getData.bind(this),
            template: buildDetailInfoWidgetTemplate,
            apiState: this.states.buildDetailInfoWidgetDataState
        };

        return <DetailInfoWidgetComponent {...detailInfoProps}/>
    }
}
