'use strict';

import { MIDDLEWARE_ACTION_TYPE } from './client';


function mergeActions(actionFromHandler, apiClientAction) {
    /*
        Merge needing data from api client action to action from handler
     */
    return {
        ...actionFromHandler,
        RELATED_TO_STATE: apiClientAction.RELATED_TO_STATE
    }
}


let apiMiddleware = store => next => action => {
    if (action.type === MIDDLEWARE_ACTION_TYPE) {
        store.dispatch(
            mergeActions(action.handler.getRequestAction(), action)
        );

        action.payload.then((response) => {
            return Promise.all([response.json(), response.status]);
        })
        .then(([json, status]) => {
            if(status >= 400) {
                store.dispatch(
                    mergeActions(action.handler.getErrorAction(json), action)
                );
                return
            }

            store.dispatch(
                mergeActions(action.handler.getSuccessAction(json), action)
            );
        })
        .catch(() => {
            store.dispatch(
                mergeActions(action.handler.getErrorAction(), action)
            );
        });
    }
    else {
        return next(action);
    }
};

export default apiMiddleware;
