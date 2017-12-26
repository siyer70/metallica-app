export default function activeTradeReducer(currentState = {selectedTrade:'', tradeBody:{}}, action){
	if (action.type === 'SELECTION-CHANGED'){
        let newState = {selectedTrade: action.payload.selectedTrade, tradeBody: action.payload.tradeBody};
		return newState;
	}
	return currentState;
}
