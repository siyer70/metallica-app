import obtainStoredUserDetails from './obtainstoreduserdetails';

function obtainToken() {
    let userDetails = obtainStoredUserDetails();
    return (userDetails && userDetails.access_token) ? userDetails.access_token : "";
}

export default obtainToken;
