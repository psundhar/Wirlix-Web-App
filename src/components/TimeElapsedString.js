import React from 'react';
import { timeElapsed } from '../utilities/dateTime';

export default ({elapsed}) => {
    let string;
    const [ minsElapsed, hoursElapsed, daysElapsed ] = timeElapsed(elapsed);

    if(daysElapsed) {
        string = daysElapsed + "d";
    }
    else if(hoursElapsed) {
        string = hoursElapsed + "h";
    }
    else if(minsElapsed) {
        string = minsElapsed + "m";
    }
    else {
        string = "now";
    }

    return (
        <span>{ string }</span>
    )
}