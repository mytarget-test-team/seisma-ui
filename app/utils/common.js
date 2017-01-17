'use strict';


export function assert(condition, message) {
    /*
        Throw error if condition is not true
     */
    if (!condition) {
        throw new Error(message || 'Assertion failed');
    }
}

export function disableConsole() {
    let lockFunc = () => {};

    for (let key of Object.keys(console)) {
        if (typeof(console[key]) === 'function') {
            console[key] = lockFunc
        }
    }
}

export function randomUUID() {
    /*
     Generate random uuid
     */
    return Math.random().toString(36).substring(7).split('').join('.')
}

export function isSubClass(A, B) {
    /*
        Check A is subclass of B
     */
    return (A.prototype instanceof B)
}


export function cropString(str, len = 30) {
    /*
        Do crop string if length of string more len param
     */
    if (str.length > len) {
        return `${str.slice(0, len)}...`
    }

    return str
}
