'use strict';

import React from 'react';

import { Component, connect, requiredProp } from '../../core';

import ColorLegendTemplate from './template';


@connect
export default class ColorLegendComponent extends Component {

    @requiredProp
    get legendMap() {
        return this.props.legendMap
    }

    render() {
        let templateProps = {
            legendMap: this.legendMap
        };

        return <ColorLegendTemplate {...templateProps}/>
    }

}
