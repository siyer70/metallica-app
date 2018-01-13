import myprocess from './../../common/config';
import fetchUsingToken from './fetchusingtoken';

let apiGatewayServiceUrl = myprocess.env.API_GATEWAY_URL;
let queryServiceBaseUrl = myprocess.env.REFDATA_QUERY_SERVICE_BASE_URL;

console.log("Gateway url is:", apiGatewayServiceUrl);

function loadCommodities() {
    let specificQueryService = myprocess.env.REFDATA_COMMODITY_SERVICE;
    let url = apiGatewayServiceUrl+queryServiceBaseUrl+specificQueryService;
        
	return fetchUsingToken(url)
		.then(response => response.json()).then(json => json.commodities)
}

function loadLocations() {
    let specificQueryService = myprocess.env.REFDATA_LOCATION_SERVICE;
    let url = apiGatewayServiceUrl+queryServiceBaseUrl+specificQueryService;
        
	return fetchUsingToken(url)
		.then(response => response.json()).then(json => json.locations)
}

function loadCounterparties() {
    let specificQueryService = myprocess.env.REFDATA_CP_SERVICE;
    let url = apiGatewayServiceUrl+queryServiceBaseUrl+specificQueryService;
        
	return fetchUsingToken(url)
		.then(response => response.json()).then(json => json.counterparties)
}


let refdataQueryService = {loadCommodities, loadLocations, loadCounterparties };

export default refdataQueryService;
