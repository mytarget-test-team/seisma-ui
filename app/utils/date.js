'use strict';


const MILLISECONDS_IN_DAY = 86400000;


export function stringToDate(dateString) {
    /*
        Convert string to date object
     */
    let reggie = /(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2})/;
    let dateArray = reggie.exec(dateString);

    return new Date(
        (+ dateArray[1]),
        (+ dateArray[2]) - 1, // Careful, month starts at 0!
        (+ dateArray[3]),
        (+ dateArray[4]),
        (+ dateArray[5]),
    );
}

export function calcTimeDiffByMinutesFromDate(startTime) {
    /*
        Get difference between startTime and date now by minutes
     */
    let then;
    let now = new Date();

    if (startTime instanceof Date) {
        then = startTime;
    }
    else {
        then = stringToDate(startTime);
    }

    let diff = Math.abs(now - then);

    return Math.floor((diff / 1000) / 60);
}


export function dateToString(date, format = 'y-m-d') {
    let dateArray;

    let dayIndex = 0;
    let monthIndex = 1;
    let yearIndex = 2;

    let localeString = date.toLocaleDateString();

    if (localeString.indexOf('/') != -1) {
        dayIndex = 1
        monthIndex = 0 

        dateArray = localeString.split('/');
    } else if (localeString.indexOf('.') != -1) {
        dateArray = localeString.split('.');
    } else if (localeString.indexOf('-') != -1) {
        dateArray = localeString.split('-');
    } else {
        throw new Error('Can not find separator');
    }

    let day = dateArray[dayIndex];
    let month = dateArray[monthIndex];
    let year = dateArray[yearIndex];

    format = format.replace('d', day);
    format = format.replace('m', month);
    format = format.replace('y', year);

    return format
}


export function minusDays(date, days) {
    return new Date(date - (days*MILLISECONDS_IN_DAY))
}
