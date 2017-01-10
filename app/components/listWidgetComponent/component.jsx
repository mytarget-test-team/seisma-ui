'use strict';

import React from 'react';

import { Component, connect, requiredProp, defaultProp } from '../../core';

import ListWidgetTemplate from './template';


@connect
export default class ListWidgetComponent extends Component {

    @requiredProp
    get title() {
        return this.props.title
    }

    @requiredProp
    get getData() {
        return this.props.getData
    }

    @requiredProp
    get apiState() {
        return this.props.apiState
    }

    @requiredProp
    get template() {
        return this.props.template
    }

    @defaultProp('empty object')
    get emptyText() {
        return this.props.emptyText
    }

    @defaultProp(false)
    get dontShowIfNoContent() {
        return this.props.dontShowIfNoContent
    }

    componentWillMount () {
        this.getData()
    }

    render() {
        if (this.dontShowIfNoContent) {
            if (
                this.apiState.data instanceof Array
                &&
                this.apiState.data.length === 0
            ) {
                return null
            }
        }

        let listWidgetTemplateProps = {
            title: this.title,
            template: this.template,
            data: this.apiState.data,
            emptyText: this.emptyText,
            error: this.apiState.error,
            isLoading: this.apiState.loading,
            actions: {
                updateData: this.getData
            }
        };

        return <ListWidgetTemplate {...listWidgetTemplateProps}/>
    }

}
