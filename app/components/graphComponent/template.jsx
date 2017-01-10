'use strict';

import React from 'react';

import { Template, connect } from '../../core';
import { createItemUID } from '../tableComponent';


function getPercentByFieldName(dataList, fieldName) {
    if (dataList.length > 0) {
        let dataListCopy = Array.from(dataList);

        dataListCopy.sort((a, b) => {
            return b.runtime - a.runtime;
        });

        return dataListCopy[0][fieldName] / 100;
    }

}

function getOffsetRect(elem) {
    let box = elem.getBoundingClientRect();

    let body = document.body;
    let docElem = document.documentElement;

    let scrollTop = window.pageYOffset || docElem.scrollTop || body.scrollTop;
    let scrollLeft = window.pageXOffset || docElem.scrollLeft || body.scrollLeft;

    let clientTop = docElem.clientTop || body.clientTop || 0;
    let clientLeft = docElem.clientLeft || body.clientLeft || 0;

    let top  = box.top +  scrollTop - clientTop;
    let left = box.left + scrollLeft - clientLeft;

    return {top: Math.round(top), left: Math.round(left)}
}

function handleGraphClick(elem) {
    let shadow = 'shadow';
    let selected = 'selected';
    let dataElem = document.getElementById(
        elem.target.getAttribute('data-for')
    );
    let pos = getOffsetRect(dataElem);

    document.querySelector('.list_table').classList.add(shadow);
    document.querySelector('.list_table').onclick = function () {
        this.classList.remove(shadow);
        document.querySelector(`.${selected}`).classList.remove(selected);
    };

    if(document.querySelector(`.${selected}`)) {
        document.querySelector(`.${selected}`).classList.remove(selected);
    }

    window.scrollTo(
        0,
      pos.top - ((window.innerHeight / 2) - (dataElem.clientHeight / 2)));

    dataElem.classList.add(selected);
}


@connect
export default class GraphTemplate extends Template {

    get loadingCssClass() {
        return this.props.isLoading ? 'loading' : ''
    }

    renderContent() {
        if (this.props.data && this.props.data.length > 0) {
            let percent = getPercentByFieldName(
                this.props.data, this.props.calculateFromField
            );

            return this.props.data.map((item, index) => {
                let uid = createItemUID(index);
                let classes = 'list__item';
                let styles = {
                    height: `${item[this.props.calculateFromField] / percent}%`,
                };

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

                let props = {
                    key: `graph_item_${index}`,
                    ['data-for']: uid,
                    className: classes,
                    style: styles
                };

                if (this.props.isClickable) {
                    props['onClick'] = handleGraphClick
                }

                return (
                    <li {...props}> </li>
                )
            })
        }
    }

    render() {
        if (this.props.error) {
            if (this.props.ignoreErrors) {
                return null
            }

            return this.renderError(this.props.error)
        }

        let classNames = [
            'list_graph',
            this.loadingCssClass
        ];

        return (
            <div className={classNames.join(' ')} id="list_graph">
                <ul className='module__content list_wrapper'>
                    {this.renderContent()}
                </ul>
            </div>
        )
    }

}
