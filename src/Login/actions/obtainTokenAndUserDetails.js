var request = require('request');
import myprocess from './../../common/config';

function obtainTokenAndUserDetails(userId, password, source, cb){
    let apiGatewayServiceUrl = myprocess.env.API_GATEWAY_URL;
    let url = apiGatewayServiceUrl + "/oauth/token";

    request({
        url: url,
        method: 'POST',
        auth: {
          user: 'metallica',
          pass: 'secret'
        },
        form: {
          'grant_type': 'password',
          'username': userId,
          'password': password
          }
    }, function(err, res) {
        var json = JSON.parse(res.body);
        if(err) {
            console.log("Error occurred - error is:", err);
            alert("An error occurred while logging in: message from server: ", err);
            cb(err, null);
            return;
        }
        if(json.error) {
            if(json.error_description && json.error_description === 'Bad credentials') {
                alert("Invalid userid or password, please try again");
            } else {
                alert("An error occurred while logging in, message from server: ", json.error_description);
            }
            cb(json.error_description, null);
            return;
        }
        console.log("Access Token:", json.access_token);
        console.log(json);
        getUserDetails(json, cb, source);
        return; 
    });
}

function getUserDetails(tokenDetails, cb, source) {
    let apiGatewayServiceUrl = myprocess.env.API_GATEWAY_URL;
    let url = apiGatewayServiceUrl + "/user";
    request(url, {
        method: 'GET',
        auth: {
          bearer: tokenDetails.access_token,
        },
    }, function(err, res) {
        var json = JSON.parse(res.body);
        if(err) {
            console.log("Error occurred - error is:", err);
            alert("An error occurred while logging in: message from server: ", err);
            cb(err, null);
            return;
        }
        if(json.error) {
            alert("An error occurred while obtaining user information, message from server: ", json.error_description);
            cb(json.error, null);
            return;
        }
        // if successful
        let userDetails = {
            ...tokenDetails,
            username : json.principal.username,
        };
        console.log(json);
        console.log("extracted details:", userDetails);
        cb(false, userDetails, source);
        return ;
    });
 }
export default obtainTokenAndUserDetails;
