import React, { useState, useEffect } from 'react';
import { Strong } from '../styled/Random.js';
import {
    StyledGame,
    StyledScore,
    StyledTimer,
    StyledChar,
} from '../styled/Game.js';

export default function Game({ history }) {
    // useState is react hook that returns an array of two objects
    // we can use destructuring to access said objects and leverage them
    // 'score' is the store of value and 'setScore' is the function to update/set said store of value
    const [score, setScore] = useState(0);
    const MAX_SECONDS = 5;
    const [ms, setMs] = useState(0);
    const [seconds, setSeconds] = useState(MAX_SECONDS);

    useEffect(() => {
        const currentTime = new Date();
        const intervalId = setInterval(() => updateTime(currentTime), 1);
        return () => {
            clearInterval(intervalId);
        };
        // note how this effect has no dependencies, implying it is intended to execute only once
    }, []);

    const updateTime = (startTime) => {
        const endDate = new Date();
        const msPassedStr = (
            endDate.getTime() - startTime.getTime()
        ).toString();
        // 00000 - first 2 strings are seconds and last 3 are MS passed
        const formattedMsString = `0000${msPassedStr}`.slice(-5);
        const updatedSeconds = (
            MAX_SECONDS - parseInt(formattedMsString.substring(0, 2))
        )
            .toString()
            .padStart(2, '0');
        const updatedMs = (
            1000 -
            parseInt(
                formattedMsString.substring(formattedMsString.length - 1, 3)
            )
        )
            .toString()
            .padStart(2, '0');
        setSeconds(updatedSeconds);
        setMs(updatedMs);
    };

    useEffect(() => {
        // in an ideal world, we'd end it at seconds <= 0 & ms <= 0, but JS interval is just too odd
        if (seconds <= -1) {
            // react router gives all router a history prop, which can be used to navigate to the next page/route
            history.push('/gameOver');
        }
    }, [seconds, ms, history]);

    // useEffect is react hook that allows us to execute a block of code when a specific dependency changes
    // useEffect accepts an array of dependencies for it to execute on, in this case, we have 'score'
    // useEffect allows us to make a 'clean-up function' return to clean up our entire
    // code (this is in current use case, setInterval isn't respected and our score is increasing expotentionally;
    // as such, the clean-up return allows us to clean-up our code before setInterval is rerendered)
    /* useEffect(() => {
        const intervalId = setInterval(() => {
            setScore((prevScore) => prevScore + 1);
        }, 1000);
        return () => {
            clearInterval(intervalId);
        };
    }, [score]); */

    return (
        <StyledGame>
            <StyledScore>
                Score: <strong>{score}</strong>
            </StyledScore>
            <StyledChar>A</StyledChar>
            <StyledTimer>
                Time:{' '}
                <Strong>
                    {seconds}: {ms}
                </Strong>
            </StyledTimer>
        </StyledGame>
    );
}
