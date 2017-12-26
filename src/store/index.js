import { createStore, combineReducers, applyMiddleware } from 'redux';
import {tradesReducer, activeTradeReducer, statusReducer} from '../reducers';
import thunk from 'redux-thunk';

let allReducers = combineReducers({
    trades : tradesReducer,
    activeTrade : activeTradeReducer,
	status : statusReducer
});

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

let appStore = createStore(allReducers, applyMiddleware(thunk));

export default appStore;