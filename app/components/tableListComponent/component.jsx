'use strict';

import React from 'react';

import { Component, connect, requiredProp, defaultProp } from '../../core'

import TableComponent from '../tableComponent';
import GraphComponent from '../graphComponent';
import ColorLegendComponent from '../../components/colorLegendComponent';
import FilterComponent, { FilterOptionsEngine } from '../filterComponent';
import PaginationComponent, { PaginationSettingsEngine } from '../paginationComponent';

import { cleanRequestParams, absoluteURLPath } from '../../utils/http';


const START_FROM_PAGE = 1;


export class GraphConfig {

    constructor() {
        this.isClickable = false;
        this.ignoreErrors = false;
        this.calculateFromField = null;
    }

    getProps() {
        if (this.calculateFromField === null) {
            throw new Error('"calculateFromFiled" is required property in GraphConfig')
        }

        return {
            isClickable: this.isClickable,
            ignoreErrors: this.ignoreErrors,
            calculateFromField: this.calculateFromField
        }
    }
}


@connect(
    new FilterOptionsEngine(),
    new PaginationSettingsEngine()
)
export default class TableListComponent extends Component {

    @requiredProp
    get getData() {
        return this.props.getData
    }

    @requiredProp
    get apiState() {
        return this.props.apiState
    }

    @requiredProp
    get location() {
        return this.useFilter ? this.props.location : this.props.location || {}
    }

    @requiredProp
    get tableTemplate() {
        return this.props.tableTemplate
    }

    @defaultProp({})
    get filterOptions() {
        return this.props.filterOptions
    }

    @defaultProp(null)
    get graphConfig() {
        return this.props.graphConfig
    }

    @defaultProp(null)
    get colorMap() {
        return this.props.colorMap
    }

    get useFilter() {
        return Object.keys(this.filterOptions).length > 0
    }

    get useGraph() {
        return this.graphConfig !== null
    }

    get useColorLegend() {
        return this.colorMap !== null
    }

    componentWillMount() {
        this.getData(
            undefined,
            START_FROM_PAGE,
            this.states.paginationSettingsState.records,
            this.location.query
        )
    }

    applyFilter() {
        this.actions.updatePaginationSettings({
            page: START_FROM_PAGE,
        });

        let requestParams = cleanRequestParams(this.states.filterOptionsState);

        this.getData(
            () => {
                this.router.replace({
                    query: requestParams,
                    pathname: absoluteURLPath(this.location.pathname)
                })
            },
            START_FROM_PAGE,
            this.states.paginationSettingsState.records,
            requestParams
        )
    }

    resetFilter() {
        this.actions.updatePaginationSettings({
            page: START_FROM_PAGE,
        });

        this.getData(
            () => {
                this.router.replace({
                    query: {},
                    pathname: absoluteURLPath(this.location.pathname)
                })
            },
            START_FROM_PAGE,
            this.states.paginationSettingsState.records,
            undefined
        )
    }

    goToPage(pageNum) {
        this.getData(
            undefined,
            pageNum,
            this.states.paginationSettingsState.records,
            cleanRequestParams(this.states.filterOptionsState)
        )
    }

    setRecordsOnPage(numRecordsOnPage) {
        this.getData(
            undefined,
            START_FROM_PAGE,
            numRecordsOnPage,
            cleanRequestParams(this.states.filterOptionsState)
        )
    }

    renderFilter() {
        let filterProps = {
            options: this.filterOptions,
            initialState: this.location.query,
            onApplyFilter: this.applyFilter.bind(this),
            onResetFilter: this.resetFilter.bind(this)
        };

        return <FilterComponent {...filterProps}/>
    }

    renderGraph() {
        let graphProps = {
            apiState: this.apiState,
            ...this.graphConfig.getProps()
        };

        return <GraphComponent {...graphProps}/>
    }

    renderTable() {
        let tableProps = {
            apiState: this.apiState,
            template: this.tableTemplate
        };

        return <TableComponent {...tableProps}/>
    }

    renderPagination() {
        let paginationProps = {
            apiState: this.apiState,
            onGoToPage: this.goToPage.bind(this),
            onSetRecordsOnPage: this.setRecordsOnPage.bind(this)
        };

        return <PaginationComponent {...paginationProps}/>
    }

    renderColorLegend() {
        let colorLegendProps = {
            legendMap: this.colorMap
        };

        return <ColorLegendComponent {...colorLegendProps}/>
    }

    render() {
        return (
            <div className="list_component">
                {this.useFilter ? this.renderFilter() : null}
                {this.useGraph ? this.renderGraph() : null}
                {this.useColorLegend ? this.renderColorLegend() : null}
                {this.renderPagination()}
                {this.renderTable()}
                {this.renderPagination()}
            </div>
        );
    }

}
