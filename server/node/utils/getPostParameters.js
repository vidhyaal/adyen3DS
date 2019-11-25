const { CHECKOUT_APIKEY, CHECKOUT_URL, MERCHANT_ACCOUNT } = require('./config');
module.exports = (endpoint, request) => {
	console.log("endpoint:  "+endpoint);
	console.log(request);
	
    const body = JSON.stringify({
        merchantAccount: MERCHANT_ACCOUNT,
        ...request
    });

    return {
        body,
        url: `${CHECKOUT_URL}/${endpoint}`,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
           'Content-Length': Buffer.byteLength(body, 'utf8'),
            'X-API-Key': CHECKOUT_APIKEY
        }
    };
};
