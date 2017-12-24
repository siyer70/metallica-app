import tradeCommandService from '../services/tradeCommandService';

function deleteTrade(tradeId){
	return function(dispatch){
		dispatch({
			type : 'LOADING'
		});
		tradeCommandService
			.deleteTrade(tradeId)
			.then(deletedTradeData => dispatch({
				type : 'DELETED',
				payload : deletedTradeData
			}))
			.then(() => dispatch({ 
				type : 'DONE'
			}))
	}
}
export default deleteTrade;
