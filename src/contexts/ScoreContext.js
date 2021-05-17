import React, { createContext, useContext, useState } from 'react';

// here, we're starting the score at -1 so the user can't go to /gameOver without having playing the game
// the min score is 0 and -1 is impossible
// this creation of context allows us to a value that's accessisble throughout the entire App
const ScoreContext = React.createContext(-1);
// useScore is a hook we've created, leverating useContext to allow us to import into any rout and/or components
const useScore = () => useContext(ScoreContext);

// the followng is a wrapper that we'd wrap on our Index.js's App, allowing us to provide context to all of the App's children
// since we're wrapping the entire App with this wrapper, we're returning the children to ensure it still runs
// after processing the underlying context provider
// the score and setScore are from useState that we would've created ad-hoc at component level, in the Game.js rout
const ScoreProvider = ({ children }) => {
    const [score, setScore] = useState(-1);
    return (
        <ScoreContext.Provider value={[score, setScore]}>
            {children}
        </ScoreContext.Provider>
    );
};

export { ScoreProvider, useScore };
