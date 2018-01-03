import tradeCommandService from '../services/tradeCommandService';
import setActiveTrade from './setActiveTrade';
function createNewTrade(tradeBody){
	return function(dispatch){
		dispatch({
			type : 'LOADING'
		});
		tradeCommandService
			.createNewTrade(tradeBody)
			.then(createdTradeData => {
				dispatch({
					type : 'ADDED',
					payload : createdTradeData
				});
				setActiveTrade(`{createdTradeData.tradeId}`, createdTradeData)(dispatch);
			})
			.then(() => dispatch({ 
				type : 'DONE'
			}))
	}
}
export default createNewTrade;
