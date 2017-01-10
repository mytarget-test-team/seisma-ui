'use strict';

import React from 'react';


export default function caseDetailsWidgetTemplate(data) {
    return (
        <ul className="widget__list">
            <li className="widget__list-item">
                <strong>Name: </strong><div>{data.name}</div>
            </li>
            <li className="widget__list-item">
                <strong>Created: </strong><times>{data.created}</times>
            </li>
            <li className="widget__list-item">
                <strong>Description: </strong><div>{data.description}</div>
            </li>
        </ul>
    )
}
