'use strict';

import React from 'react';

import URLs from '../../urls';
import { Module, connect, requiredProp } from '../../core';

import TabMenuComponent from '../../components/tabMenuComponent';


@connect
export default class JobTabMenuModule extends Module {

    @requiredProp
    get job() {
        return this.props.job
    }

    render() {
        let tabMenuProps = {
            links: [
                {
                    title: 'Builds',
                    url: URLs.builds.link(this.job)
                },
                {
                    title: 'Cases',
                    url: URLs.cases.link(this.job)
                },
                {
                    title: 'Results',
                    url: URLs.jobResults.link(this.job)
                }
            ]
        };

        return <TabMenuComponent {...tabMenuProps}/>
    }

}
