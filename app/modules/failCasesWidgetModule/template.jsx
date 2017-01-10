'use strict';

import React from 'react';
import { Link } from 'react-router';

import URLs from '../../urls';


let failCasesWidgetTemplate = [
    (item, index) => {
        let link = URLs.caseResult.link(item.case.job.name, item.case.name, item.id);

        return <Link key={`fail_case_name_${index}`} to={link}>{item.case.name}</Link>
    },
    (item, index) => {
        return <small key={`fail_case_date_${index}`}>{item.date}</small>
    }
];


export default failCasesWidgetTemplate
