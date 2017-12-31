function authFail(){
	return function(dispatch){
		dispatch({
			type : 'AUTH_FAIL'
		});
	}
}
export default authFail;
