function tradesReducer(currentState = {}, action){
	if (action.type === 'LOADED'){
        let newState = {};
        action.payload.trades.forEach(trade => {
            newState[`${trade.tradeId}`] = trade;
        });
		return newState;
	}
	if (action.type === 'ADDED'){
		let thisTrade = action.payload
        let newState = {...currentState};
        newState[`${thisTrade.tradeId}`] = thisTrade;
		return newState;
	}
	if (action.type === 'UPDATED'){
		let thisTrade = action.payload
        let newState = {...currentState};
        newState[`${thisTrade.tradeId}`] = thisTrade;
		return newState;
	}
	if (action.type === 'DELETED'){
		let thisTrade = action.payload
        let newState = {...currentState};
		delete newState[`${thisTrade.tradeId}`];
		return newState;
	}
	return currentState;
}
export default tradesReducer;
