import obtainUserDetails from './obtainstoreduserdetails';

function obtainToken() {
    let userDetails = obtainUserDetails();
    return (userDetails && userDetails.access_token) ? userDetails.access_token : "";
}

export default obtainToken;
