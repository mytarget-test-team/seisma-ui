'use strict';

import React from 'react';

import { Component, connect, requiredProp, defaultProp } from '../../core';

import GraphTemplate from './template';


@connect
export default class GraphComponent extends Component {

    @requiredProp
    get apiState() {
        return this.props.apiState
    }

    @requiredProp
    get isClickable() {
        return this.props.isClickable
    }

    @requiredProp
    get calculateFromField() {
        return this.props.calculateFromField
    }

    @defaultProp(false)
    get ignoreErrors() {
        return this.props.ignoreErrors
    }

    render() {
        let graphProps = {
            data: this.apiState.data,
            error: this.apiState.error,
            isLoading: this.apiState.loading,
            isClickable: this.isClickable,
            ignoreErrors: this.ignoreErrors,
            calculateFromField: this.calculateFromField
        };

        return <GraphTemplate {...graphProps}/>
    }
}
