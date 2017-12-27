import myprocess from './../../common/config';
console.log(myprocess.env);
let apiGatewayServiceUrl = myprocess.env.API_GATEWAY_URL;
let tradeQueryServiceBaseUrl = myprocess.env.TRADE_QUERY_SERVICE_BASE_URL;
let tradeQueryServicePrefix = myprocess.env.TRADE_QUERY_SERVICE_PREFIX;

console.log("Gateway url is:", apiGatewayServiceUrl);

function loadTrades() {
    let url = apiGatewayServiceUrl+tradeQueryServiceBaseUrl+tradeQueryServicePrefix;
        
	return fetch(url)
		.then(response => response.json())
}

function queryTrades(queryParamsInRESTFormat) {
    let queryUrl = "/" + queryParamsInRESTFormat;
    let url = apiGatewayServiceUrl+tradeQueryServiceBaseUrl+tradeQueryServicePrefix+queryUrl;
        
	return fetch(url)
		.then(response => response.json())
}

function queryTrade(tradeId) {
    let queryUrl = "/" + tradeId;
    let url = apiGatewayServiceUrl+tradeQueryServiceBaseUrl+tradeQueryServicePrefix+queryUrl;
        
	return fetch(url)
		.then(response => response.json())
}

let tradeQueryService = {loadTrades, queryTrades, queryTrade};

export default tradeQueryService;
