const paymentMethodsConfig = {
    shopperReference: 'Adyen Cartt',
    reference: 'Adyen Checkout',
    countryCode: 'NL',
    amount: {
        value: 10,
        currency: 'EUR'
    }
};

const paymentsDefaultConfig={
    "amount": {
      "currency": "USD",
      "value": 1000
    },
    "reference": "helloAdyen",
    "paymentMethod": {
      "type": "scheme",
      "number": "4917610000000000",
      "expiryMonth": "10",
      "expiryYear": "2020",
      "holderName": "John Smith",
      "cvc": "737"
    },
    "additionalData": {
      "allow3DS2": true
    },
    "accountInfo": {
      "accountCreationDate": "2019-01-17T13:42:40+01:00"
    },
    "billingAddress": {
      "country": "US",
      "city": "New York",
      "street": "Redwood Block",
      "houseNumberOrName": "37C",
      "stateOrProvince": "NY",
      "postalCode": "10039"
    },
    "shopperEmail": "s.hopper@test.com",
    "shopperIP": "192.0.2.1",
    "browserInfo": {
      "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36",
      "acceptHeader": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
      "language": "nl-NL",
      "colorDepth": 24,
      "screenHeight": 723,
      "screenWidth": 1536,
      "timeZoneOffset": 0,
      "javaEnabled": true
    },
    "channel": "web",
    "origin": "http://localhost:3000",
    "returnUrl": "http://localhost/card/",
    "merchantAccount": "SupportRecruitementCOM"
  };

/* const paymentsDefaultConfig = {
    shopperReference: 'Adyen cart',
    reference: 'Adyen Checkout',
    countryCode: 'NL',
    channel: 'Web',
	merchantAccount:'SupportRecruitementCOM',
    returnUrl: 'http://localhost:3000/success.html',
    amount: {
        value: 10,
        currency: 'EUR'
    },
    lineItems: [
        {
            id: '1',
            description: 'Test Item 1',
            amountExcludingTax: 10,
            amountIncludingTax: 11,
            taxAmount: 1,
            taxPercentage: 1,
            quantity: 1,
            taxCategory: 'High'
        }
    ]
};
 */
// Generic POST Helper
const httpPost = (endpoint, data) =>
    fetch(`/${endpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(response => response.json());

// Get all available payment methods from the local server
const getPaymentMethods = () =>
    httpPost('paymentMethods', paymentMethodsConfig)
        .then(response => {
            if (response.error) throw 'No paymentMethods available';

            return response;
        })
        .catch(console.error);

// Posts a new payment into the local server
const makePayment = (paymentMethod, config = {}) => {
    const paymentsConfig = { ...paymentsDefaultConfig, ...config };
    const paymentRequest = { ...paymentsConfig, ...paymentMethod };

   // updateRequestContainer(paymentRequest);
  // alert(paymentRequest);
    return httpPost('payments', paymentRequest)
        .then(response => {
            if (response.error) throw 'Payment initiation failed';

           // updateResponseContainer(response);
             alert(response.resultCode);
            
            return response;
        })
        .catch(console.error);
};

const makeDetailsCall = (paymentMethod, config = {}) => {
    const paymentsConfig = { ...paymentsDefaultConfig, ...config };
    const paymentRequest = { ...paymentsConfig, ...paymentMethod };

   // updateRequestContainer(paymentRequest);
  // alert(paymentRequest);
    return httpPost('paymentsDetails', paymentRequest)
        .then(response => {
            if (response.error) throw 'Payment  failed';

           // updateResponseContainer(response);
             alert(response.resultCode);
            
            return response;
        })
        .catch(console.error);
};

// Fetches an originKey from the local server
const getOriginKey = () =>
    httpPost('originKeys')
        .then(response => {
            if (response.error || !response.originKeys) throw 'No originKey available';

            return response.originKeys[Object.keys(response.originKeys)[0]];
        })
        .catch(console.error);
