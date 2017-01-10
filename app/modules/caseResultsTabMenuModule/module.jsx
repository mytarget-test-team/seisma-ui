'use strict';

import React from 'react';

import URLs from '../../urls';
import { Module, connect, requiredProp } from '../../core';

import TabMenuComponent from '../../components/tabMenuComponent';


@connect
export default class CaseResultsTabMenuModule extends Module {

    @requiredProp
    get job() {
        return this.props.job
    }

    @requiredProp
    get case() {
        return this.props.case
    }

    render() {
        let tabMenuProps = {
            links: [
                {
                    title: 'Case results',
                    url: URLs.caseResults.link(this.job, this.case)
                },
                {
                    title: 'All cases',
                    url: URLs.cases.link(this.job)
                }
            ]
        };

        return <TabMenuComponent {...tabMenuProps}/>
    }

}
