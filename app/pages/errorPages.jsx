'use strict';

import React from 'react';

import { ERROR_STACK } from '../core/errors';

import MainMenuModule from '../modules/mainMenuModule';
import PageTitleModule from '../modules/pageTitleModule';


const ISSUE_TRACKER_URL = 'https://github.com/trifonovmixail/seisma/issues';


export class InternalErrorPage extends React.Component {

    static get contextTypes() {
        return {
            router: React.PropTypes.object.isRequired
        }
    }

    render() {
        let error = ERROR_STACK.pop();

        if (error === undefined) {
            this.context.router.push('/');
            return null
        }

        return (
            <div className="internal_error">
                <MainMenuModule/>
                <PageTitleModule title="500 something went wrong"/>
                <div className="module__content error error_page">
                    <ul>
                        {
                            error.stack.split('\n').map((item, index) => {
                                let title = index === 0 ? 'error__title' : '';

                                return <li className={title} key={`error_line_${index}`}>{item}</li>
                            })
                        }
                    </ul>
                    <span className="feedback">
                        Please ask for us about it at <a href={ISSUE_TRACKER_URL} target="_blank">
                        github issue tracker</a>
                    </span>
                </div>
            </div>
        )
    }

}


export class NotFoundErrorPage extends React.Component {

    render() {
        return (
            <div className="error_not_found">
                <MainMenuModule/>
                <PageTitleModule title="404 page not found"/>
                <div className="module__content">
                    <p className="error">We are sorry but the page you are looking for does not exist.</p>
                </div>
            </div>
        )
    }

}

