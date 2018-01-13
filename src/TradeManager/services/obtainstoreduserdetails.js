function obtainStoredUserDetails() {
    let userDetailsInStr = localStorage.getItem("userDetails");
    let userDetails = {};
    console.log("Stored user detail is:", userDetailsInStr);
    if(userDetailsInStr && userDetailsInStr!=="undefined" && userDetails!=="null") {
        userDetails = JSON.parse(userDetailsInStr);
    }
    return userDetails;
}

export default obtainStoredUserDetails;