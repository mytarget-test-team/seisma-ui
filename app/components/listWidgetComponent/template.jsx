'use strict';

import React from 'react';

import { Template, connect } from '../../core';


@connect
export default class ListWidgetTemplate extends Template {

    get loadingCssClass() {
        return this.props.isLoading ? 'loading' : ''
    }

    handleUpdateButtonClick() {
        this.actions.updateData()
    }

    renderList() {
        return this.props.data.map((item, index) => {
            return (
                <li key={`item_${index}`} className="widget__list-item">
                    {
                        this.props.template.map((tplFunc) => {
                            return tplFunc(item, index)
                        })
                    }
                </li>
            )
        })
    }

    renderContent() {
        if (this.props.error) {
            return this.renderError(this.props.error)
        }

        if (this.props.data && this.props.data.length > 0) {
            return (
                <ul className="widget__list">{this.renderList()}</ul>
            )
        }

        return <p className="simple-text">{this.props.emptyText}</p>
    }

    render() {
        let classNames = [
            'widget',
            'module'
        ];

        return (
            <div className={classNames.join(' ')}>
                <h2 className="widget__header module__title">
                    {this.props.title}
                    <a href="#" className="button button__lightgray" onClick={this.handleUpdateButtonClick.bind(this)}>
                        update
                    </a>
                </h2>
                <div className={`module__content ${this.loadingCssClass}`}>
                    {this.renderContent()}
                </div>
            </div>
        )
    }

}
