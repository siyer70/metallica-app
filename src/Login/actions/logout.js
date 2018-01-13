var request = require('request');
import myprocess from './../../common/config';

function logout(token, source, cb){
    let apiGatewayServiceUrl = myprocess.env.API_GATEWAY_URL;
    let url = apiGatewayServiceUrl + "/logout";

    request({
        url: url,
        method: 'POST',
        auth: {
          bearer: token,
        }
    }, function(err, res) {
        var json = (res.body)?JSON.parse(res.body):{};
        if(err) {
            console.log("Error occurred - error is:", err);
            alert("An error occurred while logging out: message from server: ", err);
            cb(err, null);
            return;
        }
        if(json.error) {
            // redirect to /login?logout fails - ignore this error
            // alert("An error occurred while loggout in, message from server: ", json.error_description);
            // cb(json.error_description, null);
            // return;
        }
        cb(false, source);
        return;
    });
}

export default logout;
