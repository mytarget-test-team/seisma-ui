'use strict';

import React from 'react';


export default function jobDetailInfoWidgetTemplate(data) {
    return (
        <ul className="widget__list">
            <li className="widget__list-item">
                <strong>Title: </strong><div>{data.title}</div>
            </li>
            <li className="widget__list-item">
                <strong>Created: </strong><times>{data.created}</times>
            </li>
            <li className="widget__list-item">
                <strong>Total cases: </strong><div>{data.total_cases}</div>
            </li>
            <li className="widget__list-item">
                <strong>Total builds: </strong><div>{data.total_builds}</div>
            </li>
            <li className="widget__list-item">
                <strong>Description: </strong><div>{data.description}</div>
            </li>
        </ul>
    )
}
