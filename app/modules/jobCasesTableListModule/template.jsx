'use strict';

import React from 'react';
import { Link } from 'react-router';

import URLs from '../../urls';


let jobCasesTableListTemplate = [
    {
        renderHeader: (index) => {
            return <h4 className="list__item-cell" key={`table_header_${index}`}>Name</h4>
        },
        renderContent: (item, index) => {
            let link = URLs.caseResults.link(item.job.name, item.name);

            return (
                <h4 className="list__item-cell list__item-title" key={`item_name_${index}`}>
                    <Link to={link}>{item.name}</Link>
                </h4>
            )
        }
    },
    {
        renderHeader: (index) => {
            return <time className="list__item-cell" key={`table_header_${index}`}>Created</time>
        },
        renderContent: (item, index) => {
            return (
                <time className="list__item-cell" key={`item_created_${index}`}>
                    {item.created}
                </time>
            )
        }
    },
];


export default jobCasesTableListTemplate
