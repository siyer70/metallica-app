import myprocess from './../../common/config';
import fetchUsingToken from './fetchusingtoken';

let apiGatewayServiceUrl = myprocess.env.API_GATEWAY_URL;
let tradeCommandServiceBaseUrl = myprocess.env.TRADE_COMMAND_SERVICE_BASE_URL;
let tradeCommandServicePrefix = myprocess.env.TRADE_COMMAND_SERVICE_PREFIX;

function createNewTrade(tradeBody) {
    let url = apiGatewayServiceUrl+tradeCommandServiceBaseUrl+tradeCommandServicePrefix;
	let method =  'POST';
	let body = JSON.stringify(tradeBody);

	return fetchUsingToken(url, method, body)
    .then(response => response.json());
}

function updateTrade(tradeId, tradeBody){
    let tradeUpdateUrl = "/"+tradeId;
    let url = apiGatewayServiceUrl+tradeCommandServiceBaseUrl+tradeCommandServicePrefix+tradeUpdateUrl;
	let method =  'PUT';
	let body = JSON.stringify(tradeBody);
	return fetchUsingToken(url, method, body)
	.then(response => response.json());
}

function deleteTrade(tradeId){
    let tradeDeleteUrl = "/"+tradeId;
    let url = apiGatewayServiceUrl+tradeCommandServiceBaseUrl+tradeCommandServicePrefix+tradeDeleteUrl;
	let method =  'DELETE';
	return fetchUsingToken(url, method)
	.then(response => response.json());
}

let tradeCommandService = {createNewTrade, updateTrade, deleteTrade};

export default tradeCommandService;
