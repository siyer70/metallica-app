function obtainStoredUserDetails() {
    let userDetailsInStr = localStorage.getItem("userDetails");
    let userDetails = {};
    console.log("Stored user detail is:", userDetailsInStr);
    console.log("Type of Stored user detail is:", typeof userDetailsInStr);
    if(userDetailsInStr && userDetailsInStr!=="undefined" && userDetails!=="null") {
        console.log("Stored user detail is:", userDetailsInStr);
        console.log("Stored user detail is:", userDetailsInStr);
        userDetails = JSON.parse(userDetailsInStr);
    }
    return userDetails;
}

export default obtainStoredUserDetails;