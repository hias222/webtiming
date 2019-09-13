import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './admin/App';
import * as serviceWorker from './serviceWorker';
import { Route, BrowserRouter as Router } from 'react-router-dom';
import Settings from './settings/Settings';
import State from './state/State';

const routing = (
    <Router>
        <Route path="/" exact component={App} testvalue={process.env.API_URL} />
        <Route path="/Settings" component={Settings} />
        <Route path="/State" component={State} />
    </Router>
)

ReactDOM.render(routing, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
