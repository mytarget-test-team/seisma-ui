'use strict';

import React from 'react';

import { Component, connect, requiredProp, defaultProp } from '../../core';

import PaginationTemplate from './template';
import { PaginationSettingsEngine } from './engine';


const DEFAULT_AVAILABLE_PAGE_COUNT = 1;


@connect(
    new PaginationSettingsEngine()
)
export default class PaginationComponent extends Component {

    @requiredProp
    get apiState() {
        return this.props.apiState
    }

    @defaultProp(() => {})
    get onGoToPage() {
        return this.props.onGoToPage
    }

    @defaultProp(() => {})
    get onSetRecordsOnPage() {
        return this.props.onSetRecordsOnPage
    }

    get availablePagesCount() {
        let meta = this.apiState.meta || {};
        return meta['available_pages'] || DEFAULT_AVAILABLE_PAGE_COUNT
    }

    goToPage(pageNum) {
        pageNum = parseInt(pageNum);

        this.actions.updatePaginationSettings({
            page: pageNum
        });

        this.onGoToPage(pageNum)
    }

    setRecordsOnPage(numRecordsOnPage) {
        numRecordsOnPage = parseInt(numRecordsOnPage);

        this.actions.updatePaginationSettings({
            page: 1,
            records: numRecordsOnPage
        });

        this.onSetRecordsOnPage(numRecordsOnPage)
    }

    componentWillMount() {
        this.actions.updatePaginationSettings({
            page: 1
        })
    }

    render() {
        let paginationTemplateProps = {
            paginationSettingsState: this.states.paginationSettingsState,
            availablePagesCount: this.availablePagesCount,
            actions: {
                goToPage: this.goToPage.bind(this),
                setRecordsOnPage: this.setRecordsOnPage.bind(this)
            }
        };

        return <PaginationTemplate {...paginationTemplateProps}/>
    }

}
