'use strict';

import React from 'react';
import { Link } from 'react-router';

import URLs from '../../urls';


let runningBuildsWidgetTemplate = [
    (item, index) => {
        let link = URLs.build.link(item.job.name, item.name);

        return <Link key={`running_build_title_${index}`} to={link}>{item.title}</Link>
    },
    (item, index) => {
        return <small key={`running_build_ago_${index}`}>Started {item.minutes_ago} minutes ago</small>
    }
];


export default runningBuildsWidgetTemplate
