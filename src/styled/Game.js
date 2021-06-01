import styled from 'styled-components';

export const StyledGame = styled.div`
    height: 75vh;
    max-height: 500px;
    display: grid;
    // specify the grid display to have 2 rows and 1 row will be 50px and
    // another is 1fr, which will takes the rest which is 450px (this is b/c we specify max-height to 500px)
    grid-template-rows: 50px 1fr;
    // specify 3 columns where 2 columns does minmax and the middle column takes the leftover spaces
    // minmax is saying at minimum, have 50px for the column and do what eves w/ max
    grid-template-columns: minmax(50px, auto) 1fr minmax(50px, auto);
`;

export const StyledScore = styled.p`
    font-size: 1.5rem;
`;

export const StyledTimer = styled.p`
    font-size: 1.5rem;
    grid-column: 3/4;
`;

export const StyledChar = styled.p`
    font-size: 10rem;
    // this is possible because we specify grid to have 2 rows with Styledgame
    grid-row: 2;
    // specify the element starts at grid line # 1 and goes all the way to 4
    // these numbers are not column numbers, it's grid numbers (can see if inspected
    // in html on the StyledGame element, which is the parent div wrapper)
    grid-column: 1/4;
    text-align: center;
    color: var(--accent-color);
`;
