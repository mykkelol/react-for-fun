import React, { useState, useEffect } from 'react';
import { ScoreLI, ScoresList } from '../styled/HighScores';

export default function HighScores() {
    // cache the scores with hook
    const [highScores, setHighScore] = useState([]);

    // use fetchAPI to call getHighScores function
    useEffect(() => {
        const loadHighScores = async () => {
            try {
                const res = await fetch('/.netlify/functions/getHighScores');
                const scores = await res.json();
                setHighScore(scores);
            } catch (e) {
                console.log(e);
            }
        };
        loadHighScores();
    }, []);
    // display scores
    return (
        <div>
            <h1>High Scores</h1>
            <ScoresList>
                {highScores.map((score) => {
                    return (
                        <ScoreLI key={score.id}>
                            {score.fields.name} - {score.fields.score}
                        </ScoreLI>
                    );
                })}
            </ScoresList>
        </div>
    );
}
