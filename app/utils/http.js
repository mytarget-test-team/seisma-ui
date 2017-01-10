'use strict';


export function URLEncode(str) {
    /*
        Brevity is the soul of wit :)
     */
    return encodeURIComponent(str);
}

export function objectToGetParamsString(obj) {
    /*
        Convert object to get params for url concatenation
    */
    var str = '?';

    for (let key in obj) {
        if (str != '?') {
            str += '&';
        }

        str += (key + '=' + URLEncode(obj[key]));
    }

    return str;
}

export function cleanRequestParams(params) {
    /*
        Prepare get params for request send
     */
    let newParams = {};
    let keys = Object.keys(params);

    for (let key of keys) {
        let value = params[key];

        if (typeof(value) === 'object') {
            value = value.value;
        }

        if (value === undefined) {
            continue
        }

        newParams[key] = decodeURI(value);
    }

    return newParams
}

export function absoluteURLPath(pathname) {
    /*
        Do return absolute URL path
     */
    if (!pathname.startsWith('/')) {
        return `/${pathname}`
    }
    return pathname
}
