'use strict';

import React from 'react';


export default function caseResultReasonWidgetTemplate(data) {
    let needBold = false;
    let isFirstLine = true;

    return <div>{data.reason.split('\n').map((item, index) => {
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
    })}</div>
}
