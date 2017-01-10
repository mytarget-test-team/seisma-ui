'use strict';

export const NOT_FOUND_ERROR_ROUTE = '*';
export const INTERNAL_ERROR_ROUTE = '/internal-error';


export const ERROR_STACK = [];


export function raiseCondition(component, error) {
    if (process.env.NODE_ENV === 'production') {
        ERROR_STACK.push(error);
        component.context.router.push(INTERNAL_ERROR_ROUTE);
    } else {
        throw error
    }
}
