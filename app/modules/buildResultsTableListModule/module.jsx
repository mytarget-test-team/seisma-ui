'use strict';

import React from 'react';

import { Module, connect, requiredProp } from '../../core';

import { greaterZeroValidator } from '../../utils/validators';

import TableListComponent, { GraphConfig } from '../../components/tableListComponent';

import BuildResultsTableDataEngine from './engine';
import buildResultsTableListTemplate from './template';


const FILTER_OPTIONS = [
    [
        {
            type: 'number',
            name: 'runtime_less',
            title: 'Runtime less',
            placeholder: 'Integer',
            validator: greaterZeroValidator,
            errorMessage: 'Runtime can be greater or equal 1'
        },
        {
            type: 'number',
            name: 'runtime_more',
            title: 'Runtime more',
            placeholder: 'Float',
            validator: greaterZeroValidator,
            errorMessage: 'Runtime can be greater or equal 0.1'
        }
    ],
    {
        type: 'select',
        name: 'status',
        selectOptions: {
            Any: '',
            Failed: 'failed',
            Error: 'error',
            Passed: 'passed',
            Skipped: 'skipped'
        },
        title: 'Status'
    }
];


@connect(
    new BuildResultsTableDataEngine()
)
export default class BuildResultsTableListModule extends Module  {

    @requiredProp
    get job() {
        return this.props.job
    }

    @requiredProp
    get build() {
        return this.props.build
    }

    @requiredProp
    get location() {
        return this.props.location
    }

    getData(...args) {
        this.actions.getBuildResultsTableData(...[this.job, this.build, ...args])
    }

    render() {
        let graphConfig = new GraphConfig();

        graphConfig.isClickable = true;
        graphConfig.ignoreErrors = true;
        graphConfig.calculateFromField = 'runtime';

        let tableListProps = {
            graphConfig,
            colorMap: {
                red: 'error',
                orange: 'fail',
                green: 'passed',
                gray: 'skipped'
            },
            location: this.location,
            filterOptions: FILTER_OPTIONS,
            tableTemplate: buildResultsTableListTemplate,
            getData: this.getData.bind(this),
            apiState: this.states.buildResultsTableDataState
        };

        return <TableListComponent {...tableListProps}/>
    }

}

