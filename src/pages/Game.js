import React from 'react';
import { Strong } from '../styled/Random.js';
import {
    StyledGame,
    StyledScore,
    StyledTimer,
    StyledChar,
} from '../styled/Game.js';

export default function Game() {
    return (
        <StyledGame>
            <StyledScore>
                Score: <strong>0</strong>
            </StyledScore>
            <StyledChar>A</StyledChar>
            <StyledTimer>
                Time: <Strong>00: 000</Strong>
            </StyledTimer>
        </StyledGame>
    );
}
