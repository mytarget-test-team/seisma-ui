'use strict';

import React from 'react';
import { Link } from 'react-router';

import URLs from '../../urls';
import { cropString } from '../../utils/common';


const MAX_LEN_OF_NAME = 50;


let failCasesWidgetTemplate = [
    (item, index) => {
        let link = URLs.caseResult.link(item.case.job.name, item.case.name, item.id);

        return <Link key={`fail_case_name_${index}`} to={link}>{
            cropString(item.case.name, MAX_LEN_OF_NAME)
        }</Link>
    },
    (item, index) => {
        return <small key={`fail_case_date_${index}`}>{item.date}</small>
    }
];


export default failCasesWidgetTemplate
