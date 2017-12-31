function authSuccesss(){
	return function(dispatch){
		dispatch({
			type : 'AUTH_SUCCESS'
		});
	}
}
export default authSuccesss;
