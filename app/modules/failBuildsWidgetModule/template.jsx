'use strict';

import React from 'react';
import { Link } from 'react-router';

import URLs from '../../urls';
import { cropString } from '../../utils/common';


const MAX_LEN_OF_TITLE = 50;


let failBuildsWidgetTemplate = [
    (item, index) => {
        let link = URLs.build.link(item.job.name, item.name);

        return ( <Link to={link} key={`fail_build_title_${index}`}>{
            cropString(item.title, MAX_LEN_OF_TITLE)
        }</Link> )
    },
    (item, index) => {
        return ( <small key={`fail_build_date_${index}`}>{item.date}</small> )
    }
];


export default failBuildsWidgetTemplate
