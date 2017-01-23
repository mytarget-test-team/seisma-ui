'use strict';

import React from 'react';

import { Module, connect, requiredProp } from '../../core';

import TableListComponent, { GraphConfig } from '../../components/tableListComponent';

import { greaterZeroValidator } from '../../utils/validators';

import JobBuildsTableDataEngine from './engine';
import jobBuildsTableListTemplate from './template';


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
    [
        {
            type: 'number',
            name: 'fail_count_less',
            title: 'Fail count less',
            placeholder: 'Integer',
            validator: greaterZeroValidator,
            errorMessage: 'Fail count can be greater or equal 1'
        },
        {
            type: 'number',
            name: 'fail_count_more',
            title: 'Fail count more',
            placeholder: 'Integer',
            validator: greaterZeroValidator,
            errorMessage: 'Fail count can be greater or equal 1'
        }
    ],
    [
        {
            type: 'number',
            name: 'error_count_less',
            title: 'Error count less',
            placeholder: 'Integer',
            validator: greaterZeroValidator,
            errorMessage: 'Error count can be greater or equal 1'
        },
        {
            type: 'number',
            name: 'error_count_more',
            title: 'Error count more',
            placeholder: 'Integer',
            validator: greaterZeroValidator,
            errorMessage: 'Error count can be greater or equal 1'
        }
    ],
    [
        {
            type: 'number',
            name: 'success_count_less',
            title: 'Success count less',
            placeholder: 'Integer',
            validator: greaterZeroValidator,
            errorMessage: 'Success count can be greater or equal 1'
        },
        {
            type: 'number',
            name: 'success_count_more',
            title: 'Success count more',
            placeholder: 'Integer',
            validator: greaterZeroValidator,
            errorMessage: 'Success count can be greater or equal 1'
        }
    ],
    {
        type: 'select',
        name: 'was_success',
        selectOptions: {
            Any: '',
            Yes: 'true',
            No: 'false'
        },
        title: 'Was success'
    },
    {
        type: 'select',
        name: 'sort_by',
        selectOptions: {
            Date: 'date',
            Title: 'title',
            Runtime: 'runtime',
            'Error count': 'error_count',
            'Fail count': 'fail_count',
            'Success count': 'success_count',
            'Tests count': 'tests_count'
        },
        title: 'Sort by'
    }
];


@connect(
    new JobBuildsTableDataEngine()
)
export default class JobBuildsTableListModule extends Module {

    @requiredProp
    get job() {
        return this.props.job
    }

    @requiredProp
    get location() {
        return this.props.location
    }

    getData(...args) {
        this.actions.getJobBuildsTableData(...[this.job, ...args])
    }

    render() {
        let graphConfig = new GraphConfig();

        graphConfig.isClickable = true;
        graphConfig.ignoreErrors = true;
        graphConfig.calculateFromField = 'runtime';

        let tableListProps = {
            graphConfig,
            colorMap: {
                red: 'fail',
                green: 'success'
            },
            location: this.location,
            filterOptions: FILTER_OPTIONS,
            tableTemplate: jobBuildsTableListTemplate,
            getData: this.getData.bind(this),
            apiState: this.states.jobBuildsTableDataState
        };

        return <TableListComponent {...tableListProps}/>
    }

}
