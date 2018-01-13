import obtainToken from './obtaintoken';

function fetchUsingToken(url, method, body) {
    let token = obtainToken();
    console.log("obtained token in fetch function is:");
    
    let headers = {'Authorization': 'bearer ' + token}; 
    let params = {credentials: 'same-origin'};

    if(method!==undefined) {
        params = {...params, method};

        if(method==="POST" || method==='PUT') {
            let contentType = {
                'content-type' : 'application/json',
            };
            headers = {...headers, ...contentType};
            params = {...params, body};
        }
    }

    params = {headers, ...params};

    console.log(params);

    return fetch(url, params);
}

export default fetchUsingToken;
