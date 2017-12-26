function statusReducer(currentState = {loading : false}, action){
	if(action.type === 'LOADING'){
		return { loading : true};
	}
	if (action.type === 'DONE'){
		return { loading : false};
	}
	return currentState;
}
export default statusReducer;