'use strict';

import React from 'react';
import Calendar from 'react-input-calendar'

import { Template, connect } from '../../core';


function createOptions(userOptions = []) {
    let options = {};

    for (let index in userOptions) {
        let optionGroup = userOptions[index];

        if (!(optionGroup instanceof Array)) {
            optionGroup = [optionGroup];
        }

        let groupUID = `field_group_${index}`;

        for (let option of optionGroup) {
            if (!option.name) {
                throw new Error('Option name is required param')
            }

            options[option.name] = {...option, uid: groupUID};
        }
    }

    return options
}

function renderOptionsForSelect(option) {
    let selectOptionsKeys = Object.keys(option.selectOptions);

    return selectOptionsKeys.map((selectOptionName, index) => {
        let selectOptionValue = option.selectOptions[selectOptionName];

        return (
            <option value={selectOptionValue} key={`option_${selectOptionName}_${index}`}>
                {selectOptionName}
            </option>
        )
    })
}

function renderFieldSet(groups) {
    let fieldSet = [];
    let groupsKeys = Object.keys(groups);

    for(let index in groupsKeys) {
        let groupKey = groupsKeys[index];
        let group = groups[groupKey];

        fieldSet.push(
            React.createElement(
                'fieldset',
                {
                    key: `filter__group_${index}`
                },
                group
            )
        )
    }

    return fieldSet
}


function getCurrentDateString() {
    let currentDate = new Date();
    let day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();

    return `${day}/${month}/${year}`
}


@connect
export default class FilterTemplate extends Template {

    constructor(...args) {
        super(...args);

        this.options = createOptions(this.props.useOptions);
    }

    handleChangeCheckboxOrRadioButton(elem) {
        let value = elem.target.checked ? true : undefined;

        this.props.actions.updateFilterOptions({
            [elem.target.name]: value
        });
    }

    handleChangeSelect(elem) {
        let value = elem.target.selectedOptions[0].value;

        this.props.actions.updateFilterOptions({
            [elem.target.name]: value === '' ? undefined : value
        });
    }

    handleChangeInput(elem) {
        let value = elem.target.value ? elem.target.value : undefined;

        this.props.actions.updateFilterOptions({
            [elem.target.name]: value
        });
    }

    handleCalendarInput(option) {
        return (value) => {
            if (value !== null) {
                this.props.actions.updateFilterOptions({
                    [option.name]: value
                });
            }
        }
    }

    renderOptions() {
        let groups = {};
        let optionKeys = Object.keys(this.options);

        for (let optionIndex in optionKeys) {
            let optionName = optionKeys[optionIndex];
            let option = this.options[optionName];

            if(!groups[option.uid]) {
                groups[option.uid] = [];
            }

            let group = groups[option.uid];
            let renderArgs = [option, optionIndex];

            if (option.type === 'select') {
                group.push(
                    this.renderSelect(...renderArgs)
                )
            } else if (['checkbox', 'radio'].includes(option.type)) {
                group.push(
                    this.renderCheckboxOrRadio(...renderArgs)
                )
            } else if (option.type === 'date') {
                group.push(
                    this.renderCalendarInput(...renderArgs)
                )
            } else {
                group.push(
                    this.renderInput(...renderArgs)
                )
            }
        }

        return renderFieldSet(groups)
    }

    renderSelect(option, index) {
        let state = this.props.filterOptionsState[option.name] || {};

        return (
            <label key={`filter_select_${index}`}>
                <div>{option.title}</div>
                <select
                    name={option.name}
                    value={state.value}
                    onChange={this.handleChangeSelect.bind(this)} >
                    {renderOptionsForSelect(option)}
                </select>
            </label>
        )
    }

    renderCheckboxOrRadio(option, index) {
        return (
            <label key={`filter_checkbox_${index}`}>
                <input
                    type={option.type}
                    name={option.name}
                    onChange={this.handleChangeCheckboxOrRadioButton.bind(this)} />
                {option.title}
            </label>
        )
    }

    renderCalendarInput(option, index) {
        let state = this.props.filterOptionsState[option.name] || {};
        let defaultValue = option.defaultValue || getCurrentDateString();

        return (
            <label key={`filter_input_${index}`}>
                <div>{option.title}</div>
                <Calendar
                    minView={0}
                    inputName={option.name}
                    format="DD/MM/YYYY"
                    strictDateParsing={true}
                    openOnInputFocus={true}
                    hideIcon={true}
                    placeholder={option.placeholder}
                    date={state.value || defaultValue}
                    computableFormat="YYYY-MM-DD"
                    onChange={this.handleCalendarInput(option)}
                />
            </label>
        )
    }

    renderFloatInput(option, index, basicInputProps) {
        let inputProps = {
            type: 'number',
            step: '0.1',
            min: '0.1'
        };

        let props = {...basicInputProps, ...inputProps};

        return (
            <label key={`filter_input_${index}`}>
                <div>{option.title}</div>
                <input
                    {...props} />
            </label>
        )
    }

    renderNumberInput(option, index, basicInputProps) {
        let inputProps = {
            type: option.type,
            step: '1',
            min: '1'
        };

        let props = {...basicInputProps, ...inputProps};

        return (
            <label key={`filter_input_${index}`}>
                <div>{option.title}</div>
                <input
                    {...props} />
            </label>
        )
    }

    renderInput(option, index) {
        let state = this.props.filterOptionsState[option.name] || {};

        let basicInputProps = {
            name: option.name,
            placeholder: option.placeholder,
            value: state.value || '',
            onChange: this.handleChangeInput.bind(this)
        };

        if (option.type === 'float') {
            return this.renderFloatInput(option, index, basicInputProps)
        }

        return this.renderNumberInput(option, index, basicInputProps)
    }

    renderErrors() {
        let errorMessages = Object.keys(this.props.filterOptionsState)
            .filter(
                (k) => !this.props.filterOptionsState[k].isValid
            )
            .map((k) => this.props.filterOptionsState[k].message);

        return errorMessages.map((message, index) => {
            return <div className="error validation__error" key={`validation_error_${index}`}>{message}</div>
        })
    }

    render() {
        let errors = this.renderErrors();

        return (
            <form className="filter">
                <div>
                    {errors}
                    {this.renderOptions()}
                </div>
                <a href="#" className="button" onClick={() => {
                    if (errors.length === 0) {
                        this.actions.applyFilter()
                    }
                }}>Apply</a>
                <a href="#" className="button button__white" onClick={() => {
                    this.actions.resetFilter();
                }}>Reset</a>
            </form>
        )
    }
}
