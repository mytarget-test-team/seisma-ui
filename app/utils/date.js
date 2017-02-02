'use strict';


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
    let localeString = date.toLocaleDateString();
    let dateArray = localeString.split('.');
    let day = dateArray[0];
    let month = dateArray[1];
    let year = dateArray[2];

    format = format.replace('d', day);
    format = format.replace('m', month);
    format = format.replace('y', year);

    return format
}
