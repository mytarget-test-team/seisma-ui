'use strict';

import React from 'react';

import { Module, connect, requiredProp, defaultProp } from '../../core';

import DetailInfoWidgetComponent from '../../components/detailInfoWidgetComponent';

import CaseResultDetailsDataEngine from './engine';
import caseResultDetailsWidgetTemplate from './template';


@connect(
    new CaseResultDetailsDataEngine()
)
export default class CaseResultDetailsWidgetModule extends Module {

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

    @defaultProp('Case result details')
    get title() {
        return this.props.title
    }

    getData() {
        this.actions.getCaseResultDetailsData(this.job, this.case, this.result)
    }

    render() {
        let contentBlockProps = {
            title: this.title,
            getData: this.getData.bind(this),
            template: caseResultDetailsWidgetTemplate,
            apiState: this.states.caseResultDetailsDataState
        };

        return <DetailInfoWidgetComponent {...contentBlockProps}/>
    }

}
