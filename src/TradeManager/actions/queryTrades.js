import tradeQueryService from '../services/tradeQueryService';
function queryTrades(queryParams){
	return function(dispatch){
		dispatch({
			type : 'LOADING'
		});
		tradeQueryService
			.queryTrades(queryParams.queryForAPICall)
			.then(trades => {
				return dispatch({
				type : 'LOADED',
				payload : {queryCriteria: queryParams.queryJson, trades, tradeToSelect: undefined}
			})})
			.then(() => dispatch({ 
				type : 'DONE'
			}));
	}
}
export default queryTrades;