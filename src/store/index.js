import { createStore, combineReducers, applyMiddleware } from 'redux';
import createHistory from 'history/createBrowserHistory'
import { routerReducer, routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk';

import {tradesReducer, activeTradeReducer, statusReducer} from '../reducers';

let allReducers = combineReducers({
    trades : tradesReducer,
    activeTrade : activeTradeReducer,
	status : statusReducer,
	router: routerReducer
});

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

// Build the middleware for intercepting and dispatching navigation actions
const routermiddleware = routerMiddleware(history);
const middlewares = [thunk, routermiddleware];

function logger({dispatch, getState}){
	return function(next){
		return function(action){
			console.log(action);
			console.group(action.type);
			let result = next(action);
			console.groupEnd();
			return result;
		}
	}
}

let appStore = createStore(allReducers, applyMiddleware(...middlewares));

export default {appStore, history};