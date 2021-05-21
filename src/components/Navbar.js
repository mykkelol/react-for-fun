import React from 'react';
import { Link } from 'react-router-dom';
import { Accent } from '../styled/Random';
import {
    StyledNavbar,
    StyledNavBrand,
    StyledNavItems,
    StyledLink,
} from '../styled/Navbar';
import { useAuth0 } from '@auth0/auth0-react';

export default function NavBar() {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();
    return (
        <StyledNavbar>
            <StyledNavBrand>
                {/* link allows us to switch to the page linked without refreshing the whole reactapp */}
                <Link to="/">
                    Learn.Build.<Accent>Type.</Accent>
                </Link>
            </StyledNavBrand>
            <StyledNavItems>
                <li>
                    <StyledLink to="/">Home</StyledLink>
                </li>
                <li>
                    <StyledLink to="/highScores">High Scores</StyledLink>
                </li>
                {!isAuthenticated && (
                    <li>
                        <button onClick={loginWithRedirect}>Login</button>
                    </li>
                )}
                {isAuthenticated && (
                    <li>
                        <button onClick={logout}>Logout</button>
                    </li>
                )}
            </StyledNavItems>
        </StyledNavbar>
    );
}
