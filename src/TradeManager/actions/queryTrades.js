import tradeQueryService from '../services/tradeQueryService';
function queryTrades(queryParams){
	return function(dispatch){
		dispatch({
			type : 'LOADING'
		});
		tradeQueryService
			.queryTrades(queryParams)
			.then(trades => {
				return dispatch({
				type : 'LOADED',
				payload : trades
			})})
			.then(() => dispatch({ 
				type : 'DONE'
			}));
	}
}
export default queryTrades;