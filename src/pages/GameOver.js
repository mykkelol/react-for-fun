import React, { useEffect, useState } from 'react';
import { useScore } from '../contexts/ScoreContext';
import { StyledLink } from '../styled/Navbar';
import { StyledChar } from '../styled/Game';
import { StyledTitle } from '../styled/Random.js';
import { useAuth0 } from '@auth0/auth0-react';

export default function GameOver({ history }) {
    const [score] = useScore();
    const [scoreMessage, setScoreMessage] = useState('');
    const { getAccessTokenSilently, isAuthenticated } = useAuth0();

    // in ScoreContext.js, we initialized score to be -1
    // to ensure users don't get to /gameOver rout without playing the game
    // here, if user try to access /gameOver and our global value of score is 0, it'll reroute to home
    if (score === -1) {
        history.push('/');
    }

    useEffect(() => {
        const saveHighScore = async () => {
            try {
                const token = await getAccessTokenSilently();
                const requestParams = {
                    method: 'POST',
                    body: JSON.stringify({
                        name: 'sdfaewfwaegwegawgawe',
                        score,
                    }),
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
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
        if (isAuthenticated) {
            saveHighScore();
        }
    }, [getAccessTokenSilently, isAuthenticated, score]);

    return (
        <div>
            <StyledTitle>Game Over</StyledTitle>
            <h2>{scoreMessage}</h2>
            {!isAuthenticated && (
                <h2>
                    You should log in or sign up to compete for high scores!
                </h2>
            )}
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
