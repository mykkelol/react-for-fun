import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Game from './pages/Game';
import GameOver from './pages/GameOver';
import HighScores from './pages/HighScores';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Global from './styled/Global';
import { Main } from './styled/Main';
import { ThemeProvider } from 'styled-components';
import { Container } from './styled/Container';
import { useAuth0 } from '@auth0/auth0-react';
import { lightTheme, darkTheme } from './styled/Themes';
import useTheme from './hooks/UseTheme';

function App() {
    const { loading } = useAuth0();
    const [theme, toggleTheme] = useTheme();
    const currentTheme = theme === 'light' ? lightTheme : darkTheme;

    return (
        // initialize router
        <Router>
            <ThemeProvider theme={currentTheme}>
                <Global />
                <Main>
                    {loading && <p>Loading...</p>}
                    {!loading && (
                        <Container>
                            <Navbar toggleTheme={toggleTheme} />
                            {/* 
                                - Switch is optional, but it optimise react by being rendering exclusively
                                for instance, if we did /game, with Switch, it'd render only /game
                                if we forgo switch with only routes, it'd render all routes because it renders inclusively
                                - after creating underlying router, create ./src/pages directory and add route's corresponding .js
                                - after creating the pages directory, import them to underying app
                                - after importing the pages directory, create the component directory which are components used in our pages
                                - after creating the component (i.e. Navbar), add it the underlying app
                            */}
                            <Switch>
                                <Route path="/game" component={Game}></Route>
                                <Route
                                    path="/highScores"
                                    component={HighScores}
                                ></Route>
                                <Route
                                    path="/gameOver"
                                    component={GameOver}
                                ></Route>
                                <Route path="/" component={Home}></Route>
                            </Switch>
                        </Container>
                    )}
                </Main>
            </ThemeProvider>
        </Router>
    );
}

export default App;
