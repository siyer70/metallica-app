export default function selectTrade(tradeToSelect){
	return function(dispatch){
		dispatch({
			type : 'LOADING'
		});
		dispatch({
            type : 'SELECT-TRADE',
            payload : {tradeToSelect}
        });
		dispatch({ 
				type : 'DONE'
        });
	}
}
 