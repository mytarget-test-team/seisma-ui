'use strict';

import React from 'react';


export default function buildDetailInfoWidgetTemplate(data) {
    return (
        <ul className="widget__list">
            <li className="widget__list-item">
                <strong>Title: </strong><div>{data.title}</div>
            </li>
            <li className="widget__list-item">
                <strong>Date: </strong><times>{data.date}</times>
            </li>
            <li className="widget__list-item">
                <strong>Runtime: </strong><div>{data.runtime}</div>
            </li>
            <li className="widget__list-item">
                <strong>Tests count: </strong><div>{data.tests_count}</div>
            </li>
            <li className="widget__list-item">
                <strong>Fail count: </strong><div>{data.fail_count}</div>
            </li>
            <li className="widget__list-item">
                <strong>Error count: </strong><div>{data.error_count}</div>
            </li>
            <li className="widget__list-item">
                <strong>Success count: </strong><div>{data.success_count}</div>
            </li>
            {
                Object.keys(data.metadata).map((key, index) => {
                    let value = data.metadata[key];

                    if (!value.startsWith('http')) {
                        return (
                            <li className="widget__list-item" key={`metadata_${index}`}>
                                <strong>{key}: </strong><div>{value}</div>
                            </li>
                        )
                    }
                    return (
                        <li className="widget__list-item" key={`metadata_link_${index}`}>
                            <strong>{key}: </strong><a href={value} target="_blank">{key}</a>
                        </li>
                    )
                })
            }
        </ul>
    )
}
