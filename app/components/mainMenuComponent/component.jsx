'use strict';

import React from 'react';

import { Component, connect, requiredProp } from '../../core';
import MainMenuTemplate from './template';


@connect
export default class MainMenuComponent extends Component {

    @requiredProp
    get links() {
        return this.props.links
    }

    render() {
        return <MainMenuTemplate links={this.links}/>
    }

}
