import React, { useEffect, useState } from 'react';
import './oppgave4.css';

export default function Oppgave4() {
    const [time, setTime] = useState(0);
    const [minute, setMinute] = useState(0);
    const [second, setSecond] = useState(0);
    const [day, setDay] = useState(0);
    const [month, setMonth] = useState(0);
    const [year, setYear] = useState(0);
    const [showDate, setShowDate] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            const idag = new Date();
            setTime(idag.getHours());
            setMinute(idag.getMinutes());
            setSecond(idag.getSeconds());
            setDay(idag.getDate());
            setMonth(idag.getMonth() + 1);
            setYear(idag.getFullYear());
        }, 1000);

        return () => clearInterval(interval);
        
    }, [])

    const handleClick = () => {
        setShowDate(true);
    }

    return (
        <>
            <button onClick={handleClick}>Vis Dag</button>
            {showDate && (
                <h1>{day}.{month}.{year} {time}.{minute}.{second}</h1>
            )}
        </>
    )
}


