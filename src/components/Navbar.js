import React from 'react';
import { Link } from 'react-router-dom';
import { Accent } from '../styled/Random';
import {
    StyledNavbar,
    StyledNavBrand,
    StyledNavItems,
    StyledLink,
} from '../styled/Navbar';
import { StyledButton } from '../styled/Button';
import { useAuth0 } from '@auth0/auth0-react';

export default function NavBar({ toggleTheme }) {
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
                        <StyledLink onClick={loginWithRedirect}>
                            Login
                        </StyledLink>
                    </li>
                )}
                {isAuthenticated && (
                    <li>
                        <StyledLink onClick={logout}>Logout</StyledLink>
                    </li>
                )}
                <StyledButton onClick={toggleTheme}>Toggle Theme</StyledButton>
            </StyledNavItems>
        </StyledNavbar>
    );
}
