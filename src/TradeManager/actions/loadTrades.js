import tradeQueryService from '../services/tradeQueryService';
function loadTrades(){
	return function(dispatch){
		dispatch({
			type : 'LOADING'
		});
		tradeQueryService
			.loadTrades()
			.then(trades => dispatch({
				type : 'LOADED',
				payload : trades
			}))
			.then(() => dispatch({ 
				type : 'DONE'
			}));
	}
}
export default loadTrades;