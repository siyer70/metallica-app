import tradeCommandService from '../services/tradeCommandService';

function createNewTrade(tradeBody){
	return function(dispatch){
		dispatch({
			type : 'LOADING'
		});
		tradeCommandService
			.createNewTrade(tradeBody)
			.then(createdTradeData => dispatch({
				type : 'ADDED',
				payload : createdTradeData
			}))
			.then(() => dispatch({ 
				type : 'DONE'
			}))
	}
}
export default createNewTrade;
