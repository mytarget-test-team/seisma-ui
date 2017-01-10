'use strict';

import React from 'react';

import { Module, connect, requiredProp } from '../../core';
import PageTitleTemplate from './template';


@connect
export default class PageTitleModule extends Module {

    @requiredProp
    get title() {
        return this.props.title
    }

    render() {
        return <PageTitleTemplate title={this.title} />
    }

}
