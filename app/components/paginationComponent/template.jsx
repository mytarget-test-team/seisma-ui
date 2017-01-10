'use strict';

import React from 'react';

import { Template, connect } from '../../core';


const MAX_NUMBERS_TO_SHOW = 5;
const PAGE_NUMBERS_SEPARATOR = '...';
const RECORDS_SET = [50, 40, 30, 20, 10];


@connect
export default class PaginationTemplate extends Template {

    renderPageLinks() {
        let pageNumbers = [...new Array(this.props.availablePagesCount).keys()].map((i) => i + 1);

        if (pageNumbers.length > (MAX_NUMBERS_TO_SHOW * 2)) {
            let currentPageNum = this.props.paginationSettingsState.page;
            let currentPageIndex = pageNumbers.indexOf(currentPageNum);

            let onePart = pageNumbers.slice(0, 1);
            let twoPart;
            let threePart = pageNumbers.slice(pageNumbers.length - 1, pageNumbers.length);

            if (!onePart.includes(currentPageNum) && !threePart.includes(currentPageNum)) {
                twoPart = pageNumbers.slice(currentPageIndex - 1, currentPageIndex + MAX_NUMBERS_TO_SHOW - 1);
            } else if (onePart.includes(currentPageNum)){
                twoPart = pageNumbers.slice(currentPageIndex + 1, currentPageIndex + MAX_NUMBERS_TO_SHOW + 1);
            } else {
                twoPart = pageNumbers.slice(currentPageIndex - MAX_NUMBERS_TO_SHOW, currentPageIndex);
            }

            pageNumbers = [
                ...onePart,
                PAGE_NUMBERS_SEPARATOR,
                ...twoPart.filter(
                    (item) => !onePart.includes(item) && !threePart.includes(item)
                ),
                PAGE_NUMBERS_SEPARATOR,
                ...threePart
            ]
        }

        return pageNumbers.map((pageNum, index) => {
            if (pageNum === this.props.paginationSettingsState.page) {
                return <strong
                    key={`pag_not_active_${index}`}
                    className="paginator__item paginator__item-selected">
                    {pageNum}
                </strong>
            } else if (pageNum === PAGE_NUMBERS_SEPARATOR) {
                return <span key={`pag_separator_${index}`}>{PAGE_NUMBERS_SEPARATOR}</span>
            } else {
                return <a
                    href="#"
                    key={`pag_link_${index}`}
                    onClick={() => {
                        this.actions.goToPage(pageNum)
                    }}
                    className="paginator__item">
                    {pageNum}
                </a>
            }
        })
    }

    renderOptions() {
        return (
            <select
                className="paginator__configurator"
                value={this.props.paginationSettingsState.records}
                onChange={(e) => {
                    this.actions.setRecordsOnPage(e.target.selectedOptions[0].value)
                }}
            >
                {
                    RECORDS_SET.map((records, index) => {
                        let key = `records_option_${index}`;
                        return <option value={records} key={key}>{records}</option>
                    })
                }
            </select>
        )
    }

    render() {
        return (
            <div className="paginator">
                {this.renderOptions()}
                {this.renderPageLinks()}
            </div>
        )
    }

}
