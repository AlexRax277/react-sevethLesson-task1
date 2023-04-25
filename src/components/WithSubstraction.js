import moment from 'moment'
import React, { useEffect, useState } from "react";

const WithSubstaction = (Component) => {
    const pretty = (time_unit, time_name) => {
        const condition = time_unit % 10;
        if(time_unit < 10 || time_unit > 20) {
            if(condition === 1) {
                return time_name;
            } else if(1 < condition && condition < 5) {
                return time_name === 'минута' ? 'минуты': time_name === 'час' ? 'часа': 'дня'; 
            } else {
                return time_name === 'минута' ? 'минут': time_name === 'час' ? 'часов': 'дней';
            };  
        } else {
            return time_name === 'минута' ? 'минут': time_name === 'час' ? 'часов': 'дней';
        };
    };
    
    return function WithSubstaction(props) {
        const [now, setNow] = useState(moment());

        const delta = moment.duration(now)._milliseconds - moment.duration(moment(props.date))._milliseconds;
        const minutes = Math.round(delta/1000/60);
        const hours = Math.round(minutes/60);
        const days = Math.round(hours/24);
        const duration = minutes < 60 ? `${minutes} ${pretty(minutes, 'минута')} назад`:
                        hours < 24 ? `${hours} ${pretty(hours, 'час')} назад`: 
                        `${days} ${pretty(days, 'день')} назад`;

        useEffect(() => {
            setInterval(() => {
                setNow(() => { return moment(); });
             }, 30 * 1000);
        }, [now])

        return <div>
            <div>{duration}</div>
            <Component />
        </div> 
    };
};

export default WithSubstaction;
