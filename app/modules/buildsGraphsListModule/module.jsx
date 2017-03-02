'use strict';

import React from 'react';

import { Module, connect, defaultProp, requiredProp } from '../../core';

import ColorLegendComponent from '../../components/colorLegendComponent';

import BuildsByJobsEngine from '../buildsGraphsListModule/engine';

import PageTitleModule from '../../modules/pageTitleModule';

import GraphTemplate from '../../components/graphComponent/template';


const DEFAULT_MAX_BUILDS_ON_GRAPH = 50;


@connect(
    new BuildsByJobsEngine(),
)
export default class BuildsGraphsListModule extends Module {

    @requiredProp
    get job() {
        return this.props.job
    }

    @defaultProp(DEFAULT_MAX_BUILDS_ON_GRAPH)
    get maxBuilds() {
        return this.props.maxBuilds
    }

    getData() {
        this.configureEngines({
            BuildsByJobsEngine: {
                maxBuilds: this.maxBuilds
            }
        });

        this.actions.getBuildsByJobs()
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
        if (this.states.buildsByJobsDataState.data) {
            Object.entries(this.states.buildsByJobsDataState.data).map(
                ([jobName, builds]) => {
                    let graphProps = {
                        data: builds,
                        error: this.states.buildsByJobsDataState.error,
                        isLoading: this.states.buildsByJobsDataState.loading,
                        isClickable: false,
                        ignoreErrors: true,
                        calculateFromField: 'runtime'
                    };

                    let table_element = (
                        <div>
                            <PageTitleModule title={jobName}/>
                            <GraphTemplate {...graphProps}/>
                        </div>
                    );
                    tables.push(table_element);
                }
            );
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
