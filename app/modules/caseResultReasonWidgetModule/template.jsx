'use strict';

import React from 'react';


class DialectReason {

    constructor(reason, dialect) {
        this.reason = reason;
        this.dialect = dialect;
    }

    renderPython() {
        let needBold = false;
        let isFirstLine = true;
        let www_reg = /\b(https?:\/\/\S+)\b/gi;

        return (
            <div>
                {
                    this.reason.split('\n').map((item, index) => {
                        let node = []
                        let istitle = 0

                        if (isFirstLine || needBold) {
                            needBold = false;
                            isFirstLine = false;
                            istitle = 1
                        } else {
                            if (item === '') {
                                needBold = true;
                            }
                        }
                        item.split(www_reg).map((block,idx) => {
                            if (block.match(www_reg)) {
                                node.push(<a href={block}>{block}</a>)
                            } else {
                                node.push(block)
                            }
                        });
                        node.push(<br/>)
                        if (istitle) {
                            return (
                                <h2 key={`reason_text_${index}`}>
                                {node}
                                </h2>
                            )
                        } else {
                            return (
                                <p key={`reason_text_${index}`} className="case-reason">
                                {node}
                                </p>
                            )
                        }
                    })
                }
            </div>
        )
    }

    renderDefault() {
        return (
            <div>
                {
                    this.reason.split('\n').map((item, index) => {
                        return <p key={`reason_text_${index}`}>{item}<br/></p>;
                    })
                }
            </div>
        )
    }

    render() {
        switch (this.dialect) {
            case 'python':
                return this.renderPython();
            default:
                return this.renderDefault();
        }
    }
}


export default function caseResultReasonWidgetTemplate(data) {
    let dialectReason = new DialectReason(data.reason, data.dialect);
    return dialectReason.render()
}
