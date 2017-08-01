import moment from 'moment';

export const timeElapsed = (sinceTime) => {
    let hoursElapsed, daysElapsed;
    let minsElapsed = Math.floor((moment() - moment(sinceTime)) / 60000);

    if(minsElapsed >= 60) {
        hoursElapsed = Math.floor(minsElapsed / 60);
    }

    if(hoursElapsed >= 24) {
        daysElapsed = Math.floor(hoursElapsed / 24);
    }

    return [minsElapsed, hoursElapsed, daysElapsed];
};