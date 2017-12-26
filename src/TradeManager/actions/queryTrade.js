import tradeQueryService from '../services/tradeQueryService';
function queryTrade(queryParams){
	return function(dispatch){
		dispatch({
			type : 'LOADING'
		});
		tradeQueryService
			.queryTrade(tradeId)
			.then(trade => dispatch({
				type : 'LOADED',
				payload : trade
			}))
			.then(() => dispatch({ 
				type : 'DONE'
			}));
	}
}
export default queryTrade;