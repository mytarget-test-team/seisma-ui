'use strict';

import React from 'react';
import { Link } from 'react-router';

import { Template, connect } from '../../core';


@connect
export default class MainMenuTemplate extends Template {

    renderTabsList() {
        return this.props.links.map((link, index) => {
            return (
                <Link to={link.url} className="tabs__item" key={`tab_${index}`} activeClassName='active' onlyActiveOnIndex={true} >
                    {link.title}
                </Link>
            )
        })
    }

    render() {
        return (
            <div className="module__title tabs">
                {this.renderTabsList()}
            </div>
        )
    }
}
