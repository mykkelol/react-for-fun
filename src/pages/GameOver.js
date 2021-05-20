import React, { useEffect, useState } from 'react';
import { useScore } from '../contexts/ScoreContext';
import { StyledLink } from '../styled/Navbar';
import { StyledChar } from '../styled/Game';
import { StyledTitle } from '../styled/Random.js';

export default function GameOver({ history }) {
    const [score] = useScore();
    const [scoreMessage, setScoreMessage] = useState('');

    // in ScoreContext.js, we initialized score to be -1
    // to ensure users don't get to /gameOver rout without playing the game
    // here, if user try to access /gameOver and our global value of score is 0, it'll reroute to home
    if (score === -1) {
        history.push('/');
    }

    useEffect(() => {
        const saveHighScore = async () => {
            try {
                const requestParams = {
                    method: 'POST',
                    body: JSON.stringify({
                        name: 'sdfaewfwaegwegawgawe',
                        score,
                    }),
                };
                const response = await fetch(
                    '/.netlify/functions/saveHighScore',
                    requestParams
                );
                const data = await response.json();
                if (data.id) {
                    setScoreMessage(
                        "Congrats! You're amazing at life and are top 10!!!"
                    );
                } else {
                    setScoreMessage(
                        "Whoops - you kinda suck! It's okay, though. Life is about moving forward, so keep trying!"
                    );
                }
            } catch (e) {
                console.error(e);
            }
        };
        saveHighScore();
    }, [score]);

    return (
        <div>
            <StyledTitle>Game Over</StyledTitle>
            <h2>{scoreMessage}</h2>
            <StyledChar>{score}</StyledChar>
            <div>
                <StyledLink to="/">Go Home</StyledLink>
            </div>
            <div>
                <StyledLink to="/game">Play Again?</StyledLink>
            </div>
        </div>
    );
}
