import moment from 'moment';

export const timeElapsed = (sinceTime) => {
    let hoursElapsed;
    let minsElapsed = Math.floor((moment() - moment(sinceTime)) / 60000);
    
    if(minsElapsed >= 60) {
        hoursElapsed = Math.floor(minsElapsed / 60);
    }

    return [minsElapsed, hoursElapsed];
};