function authSuccesss(userDetails){
	return function(dispatch){
		console.log("dispatching auth success event...");
		dispatch({
			type : 'AUTH_SUCCESS',
			payload : {userDetails}
		});
	}
}
export default authSuccesss;
