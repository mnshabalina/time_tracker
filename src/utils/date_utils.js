import React from 'react';
import { intervalToDuration } from 'date-fns'

export function delta_to_str(delta) {
    const duration = intervalToDuration({'start':0, 'end':delta});
    for (const key in duration) 
        duration[key] = setLeadingZero(duration[key]);
    const {hours, minutes, seconds, ...rest} = duration;
    return `${hours}:${minutes}:${seconds}`;
}

function setLeadingZero(int_num) {
    return int_num = int_num < 10 ? `0${int_num}` : `${int_num}`;
}

function milliSecTillMidnight(){
    const midnight = new Date();
    midnight.setHours(24,0,0,0);
    const milliSecs = midnight - new Date();
    return milliSecs;
}
