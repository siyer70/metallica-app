import myprocess from './../../common/config';

let apiGatewayServiceUrl = myprocess.env.API_GATEWAY_URL;
let tradeCommandServiceBaseUrl = myprocess.env.TRADE_COMMAND_SERVICE_BASE_URL;
let tradeCommandServicePrefix = myprocess.env.TRADE_COMMAND_SERVICE_PREFIX;

function createNewTrade(tradeBody) {
    let url = apiGatewayServiceUrl+tradeCommandServiceBaseUrl+tradeCommandServicePrefix;
        
	return fetch(url, {
        method : 'POST',
        headers : {
            'content-type' : 'application/json'
        },
		body : JSON.stringify(tradeBody), 
		credentials: 'same-origin'
    })
    .then(response => response.json());
}

function updateTrade(tradeId, tradeBody){
    let tradeUpdateUrl = "/"+tradeId;
    let url = apiGatewayServiceUrl+tradeCommandServiceBaseUrl+tradeCommandServicePrefix+tradeUpdateUrl;
	return fetch(url, {
		method : 'PUT',
		headers : {
			'content-type' : 'application/json'
		},
		body : JSON.stringify(tradeBody),
		credentials: 'same-origin'
	})
	.then(response => response.json());
}

function deleteTrade(tradeId){
    let tradeDeleteUrl = "/"+tradeId;
    let url = apiGatewayServiceUrl+tradeCommandServiceBaseUrl+tradeCommandServicePrefix+tradeDeleteUrl;
	return fetch(url, {
		method : 'DELETE',
		credentials: 'same-origin'
	})
	.then(response => response.json());
}

let tradeCommandService = {createNewTrade, updateTrade, deleteTrade};

export default tradeCommandService;
