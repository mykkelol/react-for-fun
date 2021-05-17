import React from 'react';
import { useScore } from '../contexts/ScoreContext';
import { StyledLink } from '../styled/Navbar';

export default function GameOver({ history }) {
    const [score] = useScore();

    // in ScoreContext.js, we initialized score to be -1
    // to ensure users don't get to /gameOver rout without playing the game
    // here, if user try to access /gameOver and our global value of score is 0, it'll reroute to home
    if (score === -1) {
        history.push('/');
    }

    return (
        <div>
            <h1>Game Over</h1>
            <p>{score}</p>
            <StyledLink to="/">Go Home</StyledLink>
            <StyledLink to="/game">Play Again?</StyledLink>
        </div>
    );
}
