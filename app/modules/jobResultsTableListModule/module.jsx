'use strict';

import React from 'react';

import { Module, connect, requiredProp } from '../../core';

import TableListComponent, { GraphConfig } from '../../components/tableListComponent';

import { greaterZeroValidator } from '../../utils/validators';

import JobResultsTableDataEngine from './engine';
import jobResultsTableListTemplate from './template';


const FILTER_OPTIONS = [
    [
        {
            type: 'date',
            name: 'date_from',
            title: 'Date from',
            placeholder: 'Date'
        },
        {
            type: 'date',
            name: 'date_to',
            title: 'Date to',
            placeholder: 'Date'
        }
    ],
    [
        {
            type: 'number',
            name: 'runtime_less',
            title: 'Runtime less',
            placeholder: 'Float',
            validator: greaterZeroValidator,
            errorMessage: 'Runtime can be greater or equal 0.1'
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
    },
    {
        type: 'select',
        name: 'sort_by',
        selectOptions: {
            Date: 'date',
            Name: 'name',
            Runtime: 'runtime'
        },
        title: 'Sort by'
    }
];


@connect(
    new JobResultsTableDataEngine()
)
export default class JobResultsTableListModule extends Module {

    @requiredProp
    get job() {
        return this.props.job
    }

    @requiredProp
    get location() {
        return this.props.location
    }

    getData(...args) {
        this.actions.getJobResultsTableData(...[this.job, ...args])
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
            tableTemplate: jobResultsTableListTemplate,
            getData: this.getData.bind(this),
            apiState: this.states.jobResultsTableDataState
        };

        return <TableListComponent {...tableListProps}/>
    }

}
