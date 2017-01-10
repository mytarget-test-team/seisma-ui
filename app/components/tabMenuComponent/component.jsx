'use strict';

import React from 'react';

import { Component, connect, typedProp } from '../../core';
import TabMenuTemplate from './template';


@connect
export default class TabMenuComponent extends Component {

    @typedProp('object')
    get links() {
        return this.props.links
    }

    render() {
        let tabMenuTemplateProps = {
            links: this.links
        };

        return <TabMenuTemplate {...tabMenuTemplateProps}/>
    }

}
