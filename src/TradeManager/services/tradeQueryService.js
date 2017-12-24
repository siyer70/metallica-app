require('./../../common/config');
let apiGatewayServiceUrl = process.env.API_GATEWAY_URL;
let tradeQueryServiceBaseUrl = process.env.TRADE_QUERY_SERVICE_BASE_URL;
let tradeQueryServicePrefix = process.env.TRADE_QUERY_SERVICE_PREFIX;

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
