'use strict';

import React from 'react';


class DialectReason {

    constructor(reason, dialect) {
        this.reason = reason;
        this.dialect = dialect;
    }

    render_python() {
        let needBold = false;
        let isFirstLine = true;

        return (
            <div>
                {
                    this.reason.split('\n').map((item, index) => {
                        let node;

                        if (isFirstLine || needBold) {
                            needBold = false;
                            isFirstLine = false;

                            node = <h3 key={`reason_text_${index}`}>{item}<br/></h3>;
                        } else {
                            if (item === '') {
                                needBold = true;
                            }

                            node = <p key={`reason_text_${index}`} className="case-reason">{item}<br/></p>;
                        }

                        return node
                    })
                }
            </div>
        )
    }

    render_default() {
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
                return this.render_python();
            default:
                return this.render_default();
        }
    }
}


export default function caseResultReasonWidgetTemplate(data) {
    let dialectReason = new DialectReason(data.reason, data.dialect);
    return dialectReason.render()
}
