
const initialState = {
    isAuthenticated: false,
    userDetails: {}
  }
  
const authReducer = (state = initialState , action) => {
    switch (action.type) {
        case 'AUTH_SUCCESS':
        return {
            ...state,
            isAuthenticated: true,
            userDetails: action.payload.userDetails
        }
        case 'AUTH_FAIL':
        return {
            ...state,
            isAuthenticated: false,
            userDetails: {}
        }
        default:
        return state
    }
}

export default authReducer;