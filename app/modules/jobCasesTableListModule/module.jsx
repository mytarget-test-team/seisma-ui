'use strict';

import React from 'react';

import { Module, connect, requiredProp } from '../../core';

import TableListComponent from '../../components/tableListComponent';

import JobCasesTableDataEngine from './engine';
import jobCasesTableListTemplate from './template';


@connect(
    new JobCasesTableDataEngine()
)
export default class JobCasesTableListModule extends Module {

    @requiredProp
    get job() {
        return this.props.job
    }

    @requiredProp
    get location() {
        return this.props.location
    }

    getData(...args) {
        this.actions.getJobCasesTableData(...[this.job, ...args])
    }

    render() {
        let tableListProps = {
            location: this.location,
            tableTemplate: jobCasesTableListTemplate,
            getData: this.getData.bind(this),
            apiState: this.states.JobCasesTableDataState
        };

        return <TableListComponent {...tableListProps}/>
    }

}
