import tradeQueryService from '../services/tradeQueryService';
import setActiveTrade from './setActiveTrade';
function queryTrades(queryParams){
	return function(dispatch){
		dispatch({
			type : 'LOADING'
		});
		tradeQueryService
			.queryTrades(queryParams.queryForAPICall)
			.then(trades => {
				dispatch({
					type : 'LOADED',
					payload : {queryCriteria: queryParams.queryJson, trades, tradeToSelect: undefined}
				});
				if(trades.trades.length>0) {
					let firstTradeId = trades.trades[0].tradeId;
					let firstTradeBody = trades.trades[0];
					setActiveTrade(`${firstTradeId}`, firstTradeBody)(dispatch);
				} else {
					setActiveTrade('', {})(dispatch);
				}
			})
			.then(() => dispatch({ 
				type : 'DONE'
			}));
	}
}
export default queryTrades;