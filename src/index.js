import React, {Component} from 'react';
import {render} from 'react-dom';
import { Route } from 'react-router-dom'
import thunk from 'redux-thunk';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { ConnectedRouter, routerReducer, routerMiddleware } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'

import injectTapEventPlugin from 'react-tap-event-plugin';

import MainApp from './mainapp';
import {tradesReducer, activeTradeReducer, statusReducer, authReducer} from './reducers';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

let allReducers = combineReducers({
    trades : tradesReducer,
    activeTrade : activeTradeReducer,
    status : statusReducer,
    router: routerReducer,
    authReducer : authReducer
});

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const routermiddleware = routerMiddleware(history);
const middlewares = [thunk, routermiddleware];

const appStore = createStore(allReducers, applyMiddleware(...middlewares));
const muiTheme = getMuiTheme(lightBaseTheme);

// Render the main app react component into the app div.
render(
    <Provider store={appStore}>
        <ConnectedRouter history={history}>
            <MuiThemeProvider muiTheme={muiTheme}>
                <MainApp />
            </MuiThemeProvider>
        </ConnectedRouter>
    </Provider>, 
    document.getElementById('app')
);
