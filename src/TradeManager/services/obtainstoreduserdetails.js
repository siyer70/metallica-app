function obtainStoredUserDetails() {
    let userDetailsInStr = localStorage.getItem("userDetails");
    let userDetails = {};
    if(userDetailsInStr && userDetailsInStr!=="undefined") {
        console.log("Stored user detail is:", userDetailsInStr);
        userDetails = JSON.parse(userDetailsInStr);
    }
    return userDetails;
}

export default obtainStoredUserDetails;