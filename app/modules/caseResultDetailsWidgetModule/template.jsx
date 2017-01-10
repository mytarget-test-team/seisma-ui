'use strict';

import React from 'react';
import { Link } from 'react-router';

import URLs from '../../urls';


export default function caseResultDetailsWidgetTemplate(data) {
    let jobLink = URLs.builds.link(data.case.job.name);
    let buildLink = URLs.build.link(data.case.job.name, data.build.name);

    let statusClassName = 'case-result-status__item';

    switch (data.status) {
        case 'failed':
            statusClassName += ' case-result-status__item_fail';
            break;
        case 'error':
            statusClassName += ' case-result-status__item_error';
            break;
        case 'passed':
            statusClassName += ' case-result-status__item_passed';
            break;
        case 'skipped':
            statusClassName += ' case-result-status__item_skipped';
            break;
        default:
            break
    }

    return (
        <ul className="widget__list">
            <li className="widget__list-item">
                <strong>Name: </strong><div>{data.case.name}</div>
            </li>
            <li className="widget__list-item">
                <strong>Date: </strong><time>{data.date}</time>
            </li>
            <li className="widget__list-item">
                <strong>Status: </strong><span className={statusClassName}>{data.status}</span>
            </li>
            <li className="widget__list-item">
                <strong>Runtime: </strong><small>{data.runtime}</small>
            </li>
            {
                Object.keys(data.metadata).map((key, index) => {
                    if (!data.metadata[key].startsWith('http')) {
                        return (
                            <li key={`case_metadata_${index}`} className="widget__list-item">
                                <strong>{key}: </strong><small>{data.metadata[key]}</small>
                            </li>
                        )
                    }
                })
            }
            <li className="widget__list-item">
                <strong>Job: </strong><Link to={jobLink}>{data.case.job.title}</Link>
            </li>
            <li className="widget__list-item">
                <strong>Build: </strong><Link to={buildLink}>{data.build.title}</Link>
            </li>
            {
                Object.keys(data.metadata).map((key, index) => {
                    if (data.metadata[key].startsWith('http')) {
                        return (
                            <li key={`case_link_${index}`} className="widget__list-item">
                                <strong>{key}: </strong><a href={data.metadata[key]} target="_blank">{key}</a>
                            </li>
                        )
                    }
                })
            }
        </ul>
    )
}
