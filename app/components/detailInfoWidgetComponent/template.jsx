'use strict';

import React from 'react';

import { Template, connect } from '../../core';


@connect
export default class DetailInfoWidgetTemplate extends Template {

    get loadingCssClass() {
        return this.props.isLoading ? 'loading' : ''
    }

    renderContent() {
        if (this.props.error) {
            return this.renderError(this.props.error)
        }

        if (this.props.data) {
            return this.props.template(this.props.data)
        }

        return <p className="simple-text">{this.props.emptyText}</p>
    }

    render() {
        return (
            <div className='widget module'>
                <h2 className="widget__header module__title">
                    {this.props.title}
                </h2>
                <div className={`module__content ${this.loadingCssClass}`}>
                    {this.renderContent()}
                </div>
            </div>
        )
    }

}
