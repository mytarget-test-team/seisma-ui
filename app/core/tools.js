'use strict';


export function margeState(...args) {
    /*
     Merge several states to one root state
     */
    let combinedState = {};

    for (let stateItem of args) {
        combinedState = {...combinedState, ...stateItem};
    }

    return combinedState
}
