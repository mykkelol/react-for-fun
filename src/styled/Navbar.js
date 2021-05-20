import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledNavbar = styled.nav`
    display: grid;
    padding: 20px;
    // specifies sizing of columns in grid display-- here is 1 fr (fractional) on left column and right is auto
    grid-template-columns: 1fr auto;
`;

export const StyledNavBrand = styled.div`
    font-size: 1.4rem;
    text-align: left;
    // following code is SASS-like and reads as all a tag that are children of the underlying element
    & > a {
        text-decoration: none;
    }
`;

export const StyledNavItems = styled.ul`
    list-style: none;
    padding-left: 0;
    display: grid;
    // specifies auto-placement of grid display; can be row vs column
    grid-auto-flow: column;
    grid-gap: 20px;
`;

// notice how we added Link as a prop -- this is b/c Link isn't an element like div, ul, etc. -- it's a component we imported from react-router-dom
// as such, we needed to add a prop (also note that prior to utilizing styled-components, we did use tags such as ul, nav, div, etc. directly rather than the style names we've created here)
export const StyledLink = styled(Link)`
    text-decoration: none;
    font-size: 1.2rem;
    transition: color 200ms;
    &:hover {
        color: #e16365;
    }
`;
