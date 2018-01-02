function tradeEventDispatcher(tradeEvent){
	return function(dispatch){
		let changeType = (tradeEvent.changeType=='New')
							? "ADDED" : 
							(tradeEvent.changeType=='Update') 
							? "UPDATED" : "DELETED" ;
		let payload = tradeEvent.tradeBody;
		dispatch({
			type : 'LOADING'
		});
		dispatch({
			type : changeType,
			payload
		});
		dispatch({ 
				type : 'DONE'
		});
	}
}
export default tradeEventDispatcher;
