'use strict';

import React from 'react';
import { Link } from 'react-router';

import { Template, connect } from '../../core';


export function createItemUID(index) {
    return `item_${index}`
}


@connect
export default class TableTemplate extends Template {

    get loadingCssClass() {
        return this.props.isLoading ? 'loading' : ''
    }

    renderTableHead() {
        return (
            <li className="list__item list__item-head">
                {
                    this.props.template.map((tpl, index) => {
                        return tpl.renderHeader(index)
                    })
                }
            </li>
        )
    }

    renderTableContent() {
        return this.props.data.map((item, lineNum) => {
            let classes = 'list__item';
            let uid = createItemUID(lineNum);

            if (item.hasOwnProperty('was_success')) {
                if (!item.was_success) {
                    classes += ` ${classes}-error`;
                } else {
                    classes += ` ${classes}-success`
                }
            } else if (item.hasOwnProperty('status')) {
                if (item.status === 'error') {
                    classes += ` ${classes}-error`;
                } else if (item.status === 'failed') {
                    classes += ` ${classes}-fail`;
                } else if (item.status === 'passed') {
                    classes += ` ${classes}-success`;
                }
            }

            let tableLine = this.props.template.map((tpl, index) => {
                return tpl.renderContent(item, index);
            });

            return (
                <li key={`table_line_${lineNum}`} id={uid} className={classes}>
                    {tableLine}
                </li>
            )
        })
    }

    render() {
        if (this.props.error) {
            return this.renderError(this.props.error)
        }

        let classNames = [
            'module__content',
            'list_table',
            this.loadingCssClass
        ];

        if (this.props.data && this.props.data.length > 0) {
            return (
                <ul className={classNames.join(' ')}>
                    {this.renderTableHead()}
                    {this.renderTableContent()}
                </ul>
            )
        }

        return <p className="simple-text">empty object</p>
    }

}
