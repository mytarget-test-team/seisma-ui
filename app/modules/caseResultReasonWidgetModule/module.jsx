'use strict';

import React from 'react';

import { Module, connect, requiredProp } from '../../core';

import DetailInfoWidgetComponent from '../../components/detailInfoWidgetComponent';

import CaseResultReasonDataEngine from './engine';
import caseResultReasonWidgetTemplate from './template';


@connect(
    new CaseResultReasonDataEngine()
)
export default class CaseResultReasonWidgetModule extends Module {

    @requiredProp
    get job() {
        return this.props.job
    }

    @requiredProp
    get case() {
        return this.props.case
    }

    @requiredProp
    get result() {
        return this.props.result
    }

    getData() {
        this.actions.getCaseResultReasonData(this.job, this.case, this.result)
    }

    render() {
        if (
            this.states.caseResultReasonWidgetDataState.data
            &&
            this.states.caseResultReasonWidgetDataState.data.reason === ''
        ) {
            return null
        }

        let contentBlockProps = {
            title: 'Reason',
            getData: this.getData.bind(this),
            template: caseResultReasonWidgetTemplate,
            apiState: this.states.caseResultReasonWidgetDataState
        };

        return <DetailInfoWidgetComponent {...contentBlockProps}/>
    }

}
