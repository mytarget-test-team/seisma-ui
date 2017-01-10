'use strict';

import React from 'react'

import { Component, connect, requiredProp, defaultProp } from '../../core';

import FilterTemplate from './template';
import { FilterOptionsEngine } from './engine';


function createValidationSchemaFromFilterOptions(filterOptions) {
    let validationSchema = {};

    for (let optionGroup of filterOptions) {
        if (!(optionGroup instanceof Array)) {
            optionGroup = [optionGroup];
        }

        for (let option of optionGroup) {
            if (option.validator) {
                validationSchema[option.name] = {
                    validator: option.validator,
                    message: option.errorMessage
                }
            }
        }
    }

    return Object.keys(validationSchema).length > 0 ? validationSchema : undefined
}



@connect(
    new FilterOptionsEngine()
)
export default class FilterComponent extends Component {

    @requiredProp
    get options() {
        return this.props.options
    }

    @defaultProp({})
    get initialState() {
        return this.props.initialState
    }

    @requiredProp
    get onApplyFilter() {
        return this.props.onApplyFilter
    }

    @requiredProp
    get onResetFilter() {
        return this.props.onResetFilter
    }

    componentWillMount() {
        this.configureEngines({
            FilterOptionsEngine: {
                validationSchema: createValidationSchemaFromFilterOptions(this.options)
            }
        });

        let reset = (Object.keys(this.initialState).length === 0);
        this.actions.updateFilterOptions(this.initialState, reset);
    }

    applyFilter() {
        this.onApplyFilter()
    }

    resetFilter() {
        this.actions.updateFilterOptions({}, true);

        this.onResetFilter()
    }

    render() {
        let filterTemplateProps = {
            actions: {
                applyFilter: this.applyFilter.bind(this),
                resetFilter: this.resetFilter.bind(this),
                updateFilterOptions: this.actions.updateFilterOptions
            },
            useOptions: this.options,
            filterOptionsState: this.states.filterOptionsState
        };

        return <FilterTemplate {...filterTemplateProps} />
    }

}
