'use strict';

import { URLEncode } from './utils/http';

import MainPage from './pages/mainPage';

import JobCasesPage from './pages/jobCasesPage';
import JobBuildsPage from './pages/jobBuildsPage';
import JobResultsPage from './pages/jobResultsPage';
import CaseResultPage from './pages/caseResultPage';
import CaseResultsPage from './pages/caseResultsPage';
import BuildResultsPage from './pages/buildResultsPage';


const URLs = {
    main: {
        page: MainPage,
        route: '/',
        link: () => '/'
    },

    jobResults: {
        page: JobResultsPage,
        route: '/jobs/:job/results',
        link: (jobName) => `/jobs/${URLEncode(jobName)}/results`
    },

    builds: {
        page: JobBuildsPage,
        route: '/jobs/:job/builds',
        link: (jobName) => `/jobs/${URLEncode(jobName)}/builds`
    },
    build: {
        page: BuildResultsPage,
        route: '/jobs/:job/builds/:build',
        link: (jobName, buildName) => `/jobs/${URLEncode(jobName)}/builds/${URLEncode(buildName)}`
    },

    cases: {
        page: JobCasesPage,
        route: '/jobs/:job/cases',
        link: (jobName) => `/jobs/${URLEncode(jobName)}/cases`,
    },
    caseResults: {
        page: CaseResultsPage,
        route: '/jobs/:job/cases/:case',
        link: (jobName, caseName) => {
            return `/jobs/${URLEncode(jobName)}/cases/${URLEncode(caseName)}`
        }
    },
    caseResult: {
        page: CaseResultPage,
        route: '/jobs/:job/cases/:case/:result',
        link: (jobName, caseName, resultId) => {
            return `/jobs/${URLEncode(jobName)}/cases/${URLEncode(caseName)}/${resultId}`
        }
    }

};


export default URLs
