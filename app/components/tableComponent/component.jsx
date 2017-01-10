'use strict';

import React from 'react';

import { Component, connect, requiredProp } from '../../core';
import TableTemplate from './template';


@connect
export default class TableComponent extends Component {

    @requiredProp
    get apiState() {
        return this.props.apiState
    }

    @requiredProp
    get template() {
        return this.props.template
    }

    render() {
        let tableTemplateProps = {
            template: this.template,
            data: this.apiState.data,
            error: this.apiState.error,
            isLoading: this.apiState.loading
        };

        return <TableTemplate {...tableTemplateProps}/>
    }

}
