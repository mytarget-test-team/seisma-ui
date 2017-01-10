'use strict';

import React from 'react';

import URLs from '../../urls';
import { Module, connect, requiredProp } from '../../core';

import TabMenuComponent from '../../components/tabMenuComponent';


@connect
export default class BuildTabMenuModule extends Module {

    @requiredProp
    get job() {
        return this.props.job
    }

    @requiredProp
    get build() {
        return this.props.build
    }

    render() {
        let tabMenuProps = {
            links: [
                {
                    title: 'All builds',
                    url: URLs.builds.link(this.job)
                },
                {
                    title: 'Build results',
                    url: URLs.build.link(this.job, this.build)
                }
            ]
        };

        return <TabMenuComponent {...tabMenuProps}/>
    }

}
