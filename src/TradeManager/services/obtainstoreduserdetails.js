function obtainUserDetails() {
    let userDetailsInStr = localStorage.getItem("userDetails");
    let userDetails = {};
    if(userDetailsInStr) {
        console.log("User detail is:", userDetailsInStr);
        userDetails = JSON.parse(userDetailsInStr);
    } else {
        alert("User detail could not be found in the store - calling services may fail");
        return {};
    }
    return userDetails;
}

export default obtainUserDetails;