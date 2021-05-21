import React from 'react';
import CTA from '../styled/CTA.js';
import { Accent, StyledTitle } from '../styled/Random.js';
import { useAuth0 } from '@auth0/auth0-react';

// create functional component that represents the underlying component, home.js
export default function Home() {
    const { user } = useAuth0();
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
