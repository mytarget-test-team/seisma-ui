'use strict';

import React from 'react';

import URLs from '../../urls';
import { Module, connect } from '../../core';
import MainMenuComponent from '../../components/mainMenuComponent';


@connect
export default class MainMenuModule extends Module {

    render() {
        let mainMenuProps = {
            links: [
                {
                    text: 'Main',
                    url: URLs.main.link()
                },
                {
                    text: 'Monitor',
                    url: URLs.monitor.link()
                }
            ]
        };

        return <MainMenuComponent {...mainMenuProps}/>
    }

}
