'use strict';

import React from 'react';
import { Link } from 'react-router';

import { Template, connect } from '../../core';


@connect
export default class MainMenuTemplate extends Template {

    createLink(text, url) {
        return <Link to={url} activeClassName='active' onlyActiveOnIndex={true}>{text}</Link>
    }

    render() {
        return (
            <ul className="menu">
                    {this.props.links.map(
                        (link, index) => {
                            return (
                                <li key={`main_menu_link_${index}`} className="menu__item">
                                    {this.createLink(link.text, link.url)}
                                </li>
                            )
                        }
                    )}
            </ul>
        )
    }
}
