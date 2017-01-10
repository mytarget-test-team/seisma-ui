'use strict';

import React from 'react';

import URLs from '../../urls';
import { Module, connect, requiredProp } from '../../core';

import TabMenuComponent from '../../components/tabMenuComponent';


@connect
export default class CaseResultTabMenuModule extends Module {

    @requiredProp
    get job() {
        return this.props.job
    }

    @requiredProp
    get case() {
        return this.props.case
    }

    @requiredProp
    get result() {
        return this.props.result
    }

    render() {
        let tabMenuProps = {
            links: [
                {
                    title: 'Case result',
                    url: URLs.caseResult.link(this.job, this.case, this.result)
                },
                {
                    title: 'All results',
                    url: URLs.caseResults.link(this.job, this.case)
                }
            ]
        };

        return <TabMenuComponent {...tabMenuProps}/>
    }

}
