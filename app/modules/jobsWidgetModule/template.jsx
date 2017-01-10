'use strict';

import React from 'react';
import { Link } from 'react-router';

import URLs from '../../urls';


let jobWidgetTemplate = [
    (item, index) => {
        let link = URLs.builds.link(item.name);

        return <Link to={link} key={`job_title_${index}`}>{item.title}</Link>
    },
    (item, index) => {
        return <small key={`job_created_${index}`}>{item.created}</small>
    }
];


export default jobWidgetTemplate
