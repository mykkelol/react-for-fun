import React, { useEffect } from 'react';
import CTA from '../styled/CTA.js';
import { Accent, StyledTitle } from '../styled/Random.js';

// create functional component that represents the underlying component, home.js
export default function Home() {
    // how functional component works is we simply return what we want to display
    return (
        <div>
            <StyledTitle>Ready to Type?!</StyledTitle>
            <CTA to="/game">
                Click or type <Accent>'s'</Accent> to start playing
            </CTA>
        </div>
    );
}
