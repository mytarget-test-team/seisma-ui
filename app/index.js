'use strict';

import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

import URLs from './urls';
import { Application, PageContainer } from './core';

import apiMiddleware from './api/apiMiddleware';
import { disableConsole } from './utils/common';

import { InternalErrorPage, NotFoundErrorPage } from './pages/errorPages';


/*
    Element id in DOM tree to rendering
 */
const ROOT_ELEMENT_ID = 'seisma';

/*
    Common engines by default
 */
const ENGINES = [];

/*
    Middleware what will registering on application
 */
const MIDDLEWARE = [
    thunk,
    apiMiddleware,
];

/*
    Set initial state for application here
 */
const INITIAL_STATE = undefined;


function main() {
    /*
        Entry point to program
     */
    if (process.env.NODE_ENV !== 'production') {
        // If we are using production environment, we are not logging events
        MIDDLEWARE.push(createLogger());
    } else {
        disableConsole();
    }

    let URLsKeys = Object.keys(URLs);
    let pageContainer = new PageContainer(...URLsKeys.filter((key) => URLs[key].page !== null).map((key) => {
        let url = URLs[key];
        return url.page(url.route)
    }));

    pageContainer.registerNotFoundPage(NotFoundErrorPage);
    pageContainer.registerInternalErrorPage(InternalErrorPage);

    let app = new Application(pageContainer, INITIAL_STATE, MIDDLEWARE, ENGINES);

    app.startListen(ROOT_ELEMENT_ID);
}


// Let's get start it :)
main();
