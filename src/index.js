import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import config from './auth_config.json';
import { ScoreProvider } from './contexts/ScoreContext';
import { Auth0Provider } from '@auth0/auth0-react';

ReactDOM.render(
    // Auth0 clientId is public, no masking needed
    <Auth0Provider
        domain={config.domain}
        clientId={config.clientId}
        redirectUri={window.location.origin}
    >
        <React.StrictMode>
            <ScoreProvider>
                <App />
            </ScoreProvider>
        </React.StrictMode>
    </Auth0Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
