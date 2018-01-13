var request = require('request');
import myprocess from './../../common/config';
import obtainUserDetails from './obtainUserDetails';

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
            console.log("An error occurred while logging in: message from server: ", err);
            cb(err, null);
            return;
        }
        if(json.error) {
            if(json.error_description && json.error_description === 'Bad credentials') {
                alert("Invalid userid or password, please try again");
            } else {
                console.log("An error occurred while logging in, message from server: ", json.error_description);
            }
            cb(json.error_description, null);
            return;
        }
        obtainUserDetails(json, source, cb);
        return; 
    });
}

export default obtainTokenAndUserDetails;
