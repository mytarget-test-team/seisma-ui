'use strict';

import React from 'react';

import { Template, connect } from '../../core';


const COLOR_NAME_TO_CLASS_NAME = {
    red: 'annotation__item_red',
    gray: 'annotation__item_gray',
    green: 'annotation__item_green',
    orange: 'annotation__item_orange',
};


@connect
export default class ColorLegendTemplate extends Template {

    render() {
        return (
            <ul className="annotation">
                {
                    Object.keys(this.props.legendMap).map(
                        (colorName, index) => {
                            let annotation = this.props.legendMap[colorName];
                            let className = `annotation__item ${COLOR_NAME_TO_CLASS_NAME[colorName] || ''}`;

                            return (
                                <li key={`annotate_${index}`} className={className}>
                                    {annotation}
                                </li>
                            )
                        }
                    )
                }
            </ul>
        )
    }

}
