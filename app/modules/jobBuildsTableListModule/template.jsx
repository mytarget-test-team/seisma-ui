'use strict';

import React from 'react';
import { Link } from 'react-router';

import URLs from '../../urls';


let jobBuildsTableListTemplate = [
    {
        renderHeader: (index) => {
            return <h4 className="list__item-cell" key={`table_header_${index}`}>Title</h4>
        },
        renderContent: (item, index) => {
            let link = URLs.build.link(item.job.name, item.name);

            return (
                <h4 className="list__item-cell list__item-title" key={`item_title_${index}`}>
                    <Link to={link}>{item.title}</Link>
                </h4>
            )
        }
    },
    {
        renderHeader: (index) => {
            return <strong className="list__item-cell" key={`table_header_${index}`}>Runtime</strong>
        },
        renderContent: (item, index) => {
            return (
                <strong className="list__item-cell" key={`item_runtime_${index}`}>
                    {item.runtime}
                </strong>
            )
        }
    },
    {
        renderHeader: (index) => {
            return <div className="list__item-cell" key={`table_header_${index}`}>Error count</div>
        },
        renderContent: (item, index) => {
            return (
                <div className="list__item-cell" key={`item_error_count_${index}`}>
                    {item.error_count}
                </div>
            )
        }
    },
    {
        renderHeader: (index) => {
            return <div className="list__item-cell" key={`table_header_${index}`}>Fail count</div>
        },
        renderContent: (item, index) => {
            return (
                <div className="list__item-cell"  key={`item_fail_count_${index}`}>
                    {item.fail_count}
                </div>
            )
        }
    },
    {
        renderHeader: (index) => {
            return <div className="list__item-cell" key={`table_header_${index}`}>Success count</div>
        },
        renderContent: (item, index) => {
            return (
                <div className="list__item-cell" key={`item_success_count_${index}`}>
                    {item.success_count}
                </div>
            )
        }
    },
    {
        renderHeader: (index) => {
            return <div className="list__item-cell" key={`table_header_${index}`}>Tests count</div>
        },
        renderContent: (item, index) => {
            return (
                <div className="list__item-cell" key={`item_tests_count_${index}`}>
                    {item.tests_count}
                </div>
            )
        }
    },
    {
        renderHeader: (index) => {
            return <time className="list__item-cell" key={`table_header_${index}`}>Date</time>
        },
        renderContent: (item, index) => {
            return (
                <time className="list__item-cell" key={`item_date_${index}`}>
                    {item.date}
                </time>
            )
        }
    },
];


export default jobBuildsTableListTemplate
