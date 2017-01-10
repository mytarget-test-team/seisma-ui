'use strict';

import React from 'react';
import { Link } from 'react-router';

import URLs from '../../urls';


let buildResultsTableListTemplate = [
    {
        renderHeader: (index) => {
            return <h4 className="list__item-cell" key={`table_header_${index}`}>Name</h4>
        },
        renderContent: (item, index) => {
            let link = URLs.caseResult.link(item.case.job.name, item.case.name, item.id);

            return (
                <h4 className="list__item-cell list__item-title" key={`item_name_${index}`}>
                    <Link to={link}>{item.case.name}</Link>
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
            return <time className="list__item-cell" key={`table_header_${index}`}>Date</time>
        },
        renderContent: (item, index) => {
            return (
                <time className="list__item-cell" key={`item_date_${index}`}>
                    {item.date}
                </time>
            )
        }
    }
];


export default buildResultsTableListTemplate
