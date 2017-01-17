'use strict';

import React from 'react';
import { Link } from 'react-router';

import URLs from '../../urls';
import { cropString } from '../../utils/common';


const MAX_LEN_OF_TITLE = 50;


let jobWidgetTemplate = [
    (item, index) => {
        let link = URLs.builds.link(item.name);

        return <Link to={link} key={`job_title_${index}`}>{
            cropString(item.title, MAX_LEN_OF_TITLE)
        }</Link>
    },
    (item, index) => {
        return <small key={`job_created_${index}`}>{item.created}</small>
    }
];


export default jobWidgetTemplate
