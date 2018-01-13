var request = require('request');
import myprocess from './../../common/config';

export default function obtainUserDetails(tokenDetails, source, cb) {
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
            console.log("An error occurred while obtaining user information, message from server: ", err);
            cb(err, null);
            return;
        }
        if(json.error) {
            cb(json.error, null);
            return;
        }
        // if successful
        let userDetails = {
            ...tokenDetails,
            username : json.principal.username,
        };
        console.log("Details received for user details request from server:", json);
        console.log("User details formed from server request:", userDetails);
        cb(false, userDetails, source);
        return ;
    });
 }
