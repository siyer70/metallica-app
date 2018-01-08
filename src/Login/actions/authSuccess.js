function authSuccesss(){
	return function(dispatch){
		console.log("dispatching auth success event...");
		dispatch({
			type : 'AUTH_SUCCESS'
		});
	}
}
export default authSuccesss;
