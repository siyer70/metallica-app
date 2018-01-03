import tradeCommandService from '../services/tradeCommandService';
import setActiveTrade from './setActiveTrade';

function updateTrade(tradeId, tradeBody){
	return function(dispatch){
		dispatch({
			type : 'LOADING'
		});
		tradeCommandService
			.updateTrade(tradeId, tradeBody)
			.then(alteredTradeData => {
				dispatch({
					type : 'UPDATED',
					payload : alteredTradeData
				});
				setActiveTrade(`{alteredTradeData.tradeId}`, alteredTradeData)(dispatch);
			})
			.then(() => dispatch({ 
				type : 'DONE'
			}))
	}
}
export default updateTrade;
