export default function setActiveTrade(selectedTrade, tradeBody){
	return function(dispatch){
		dispatch({
			type : 'LOADING'
		});
		dispatch({
            type : 'SELECTION-CHANGED',
            payload : {selectedTrade, tradeBody}
        });
		dispatch({ 
				type : 'DONE'
        });
	}
}
 