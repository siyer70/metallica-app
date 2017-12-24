import tradeCommandService from '../services/tradeCommandService';

function updateTrade(tradeId, tradeBody){
	return function(dispatch){
		dispatch({
			type : 'LOADING'
		});
		tradeCommandService
			.updateTrade(tradeId, tradeBody)
			.then(alteredTradeData => dispatch({
				type : 'UPDATED',
				payload : alteredTradeData
			}))
			.then(() => dispatch({ 
				type : 'DONE'
			}))
	}
}
export default updateTrade;
