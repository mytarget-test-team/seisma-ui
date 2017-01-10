'use strict';

import React from 'react';

import { Module, connect, requiredProp, defaultProp } from '../../core';

import DetailInfoWidgetComponent from '../../components/detailInfoWidgetComponent';

import caseDetailsWidgetTemplate from './template';
import CaseDetailsWidgetDataEngine from './engine';


@connect(
    new CaseDetailsWidgetDataEngine()
)
export default class CaseDetailsWidgetModule extends Module {

    @requiredProp
    get job() {
        return this.props.job
    }

    @requiredProp
    get case() {
        return this.props.case
    }

    @defaultProp('Case details')
    get title() {
        return this.props.title
    }

    getData() {
        this.actions.getCaseByName(this.job, this.case)
    }

    render() {
        let detailInfoProps = {
            title: this.title,
            emptyText: 'data was not found',
            getData: this.getData.bind(this),
            template: caseDetailsWidgetTemplate,
            apiState: this.states.caseDetailsWidgetDataState
        };

        return <DetailInfoWidgetComponent {...detailInfoProps}/>
    }

}
