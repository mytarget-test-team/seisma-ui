'use strict';

import React from 'react';

import { Module, connect } from '../../core';

import ColorLegendComponent from '../../components/colorLegendComponent';

import BuildsFromJobsEngine from '../buildsGraphsListModule/engine';

import PageTitleModule from '../../modules/pageTitleModule';

import GraphTemplate from '../../components/graphComponent/template';


@connect(
    new BuildsFromJobsEngine(),
)
export default class BuildsGraphsListModule extends Module {

    getData() {
        this.actions.getBuildsFromJobs()
    }

    renderColorLegend() {
        let colorLegendProps = {
            legendMap: {
                red: 'fail',
                green: 'success'
            }
        };

        return <ColorLegendComponent {...colorLegendProps}/>
    }

    renderContent(tables) {
        if (tables.length > 0) {
            return (
                <div>
                    {tables}
                    {this.renderColorLegend()}
                </div>
            )
        }

        return <p className="simple-text">You are not having any jobs.</p>
    }

    componentWillMount() {
        this.getData();
    }

    render() {
        let tables = [];
        if (this.states.buildsFromJobsDataState.data) {
            this.states.buildsFromJobsDataState.data.map((item) => {
                let graphProps = {
                    data: item.last_builds,
                    error: this.states.buildsFromJobsDataState.error,
                    isLoading: this.states.buildsFromJobsDataState.loading,
                    isClickable: false,
                    ignoreErrors: true,
                    calculateFromField: 'runtime'
                };

                let table_element = (
                    <div className="graph-monitor-content">
                        <PageTitleModule title={item.title}/>
                        <GraphTemplate {...graphProps}/>
                    </div>
                );
                tables.push(table_element);
            });
        }
        let classNames = [
            'module',
            'graph'
        ];
        return (
            <div className={classNames.join(' ')}>
                {this.renderContent(tables)}
            </div>
        )
    }

}
