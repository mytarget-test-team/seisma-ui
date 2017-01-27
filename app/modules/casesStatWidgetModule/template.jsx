'use strict';

import React from 'react';
import { Link } from 'react-router';

import URLs from '../../urls';
import { cropString } from '../../utils/common';


const MAX_LEN_OF_NAME = 50;


let casesStatWidgetTemplate = [
    (item, index) => {
        let link = URLs.caseResults.link(item.job.name, item.name);

        return (
            <Link key={`case_name_${index}`} to={link}>{
                cropString(item.name, MAX_LEN_OF_NAME)
            }</Link>
        )
    },
    (item, index) => {
        return <small key={`case_fails_${index}`}>{item.fails}</small>
    }
];


export default casesStatWidgetTemplate
