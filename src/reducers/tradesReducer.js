const initialState = {queryCriteria: undefined, trades: {}, tradeToSelect: undefined};

function tradesReducer(currentState = initialState, action){
	if (action.type === 'LOADED'){
		let trades = {};
        action.payload.trades.trades.forEach(trade => {
            trades[`${trade.tradeId}`] = trade;
        });
		let newState = {
			queryCriteria: action.payload.queryCriteria, 
			trades, 
			tradeToSelect: '0'
		};
		return newState;
	}
	if ((action.type === 'ADDED') || (action.type === 'UPDATED') ){
		let thisTrade = action.payload
		let trades = currentState.trades;
		let tradeId = `${thisTrade.tradeId}`;
        trades[tradeId] = thisTrade;
		let newState = {
			queryCriteria: currentState.queryCriteria, 
			trades, 
			tradeToSelect: tradeId
		};
		return newState;
	}
	if (action.type === 'DELETED'){
		let thisTrade = action.payload
		let trades = currentState.trades;
		let tradeId = `${thisTrade.tradeId}`;
        delete trades[tradeId];
		let newState = {
			queryCriteria: currentState.queryCriteria, 
			trades, 
			tradeToSelect: undefined
		};
		return newState;
	}
	if (action.type === 'SELECT-TRADE'){
		let newState = {
			queryCriteria: currentState.queryCriteria, 
			trades : currentState.trades, 
			tradeToSelect: action.payload.tradeToSelect
		};
		return newState;
	}
	return currentState;
}
export default tradesReducer;
