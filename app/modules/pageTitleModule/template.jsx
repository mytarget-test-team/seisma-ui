'use strict';

import React from 'react';

import { Template, connect } from '../../core';


@connect
export default class PageTitleTemplate extends Template {

    render() {
        if(this.props.title) {
            return <h2 className="module__title">{this.props.title}</h2>
        }
    }

}
