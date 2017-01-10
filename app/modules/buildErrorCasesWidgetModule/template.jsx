'use strict';

import React from 'react';
import { Link } from 'react-router';

import URLs from '../../urls';


let buildErrorCasesWidgetTemplate = [
    (item, index) => {
        let link = URLs.caseResult.link(item.case.job.name, item.case.name, item.id);

        return <Link key={`case_title_${index}`} to={link}>{item.case.name}</Link>
    },
    (item, index) => {
        return <small key={`case_runtime_${index}`}>{item.runtime}</small>
    }
];


export default buildErrorCasesWidgetTemplate
