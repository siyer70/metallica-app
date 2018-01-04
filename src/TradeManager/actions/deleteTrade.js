import tradeCommandService from '../services/tradeCommandService';
import setActiveTrade from './setActiveTrade';
function deleteTrade(tradeId){
	return function(dispatch){
		dispatch({
			type : 'LOADING'
		});
		tradeCommandService
			.deleteTrade(tradeId)
			.then(deletedTradeData => {
				dispatch({
					type : 'DELETED',
					payload : deletedTradeData
				});
				setActiveTrade('', {})(dispatch);			
			})
			.then(() => dispatch({ 
				type : 'DONE'
			}))
	}
}
export default deleteTrade;
