// 0. Get originKey
getOriginKey().then(originKey => {
    getPaymentMethods().then(paymentMethodsResponse => {
        // 1. Create an instance of AdyenCheckout
        const checkout = new AdyenCheckout({
            environment: 'test',
            originKey: "pub.v2.7814658006340126.aHR0cDovL2xvY2FsaG9zdDozMDAw.DCeeOiTfpBwtKc7ieW0zvVHaedH7JKbmA1SwcRvvRxc", // Mandatory. originKey from Costumer Area
            paymentMethodsResponse,
			
            //removePaymentMethods: ['paysafecard', 'c_cash']
        });	

        // 2. Create and mount the Component
		
         const dropin = checkout
            .create('dropin', {
                // Events
               /*  onSelect: activeComponent => {
                    updateStateContainer(activeComponent.data); // Demo purposes only
                },*/
                onChange: state => {
                     // Demo purposes only
                }, 
                onSubmit: (state, dropin) => {
                     state.data;
                     state.isValid;
                     makePayment(state.data)
                     // Your function calling your server to make the /payments request
                     
                     .then(action => {
                         console.log(action.action.type);
                        if (action.action.type=='threeDS2Challenge'){
                            console.log("In");
                            checkout.create('threeDS2Challenge', {
                                challengeToken: action.authentication['threeds2.challengeToken'],
                                onComplete: function() {}, // Called whenever a result is available, regardless if the outcome is successful or not.
                                onError: function() {}, // Gets triggered on error.
                                size: '05' // Defaults to '01'
                            })
                            .mount('#threeDS2');
                            dropin.handleAction(action.action);
                            
                        }
                       
                       // Drop-in handles the action object from the /payments response
                     })
                     .catch(error => {
                       throw Error(error);
                     });
                 },
                 onAdditionalDetails: (state, dropin) => {
                    makeDetailsCall(state.data)
                      // Your function calling your server to make a /payments/details request
                      .then(action => {
                        //dropin.handleAction(action);
                        // Drop-in handles the action object from the /payments/details response
                       console.log(action.resultCode);
                       if(action.resultCode=='Authorised' || action.resultCode=='Received'){
                            dropin.setStatus('success');
                            dropin.setStatus('success', { message: 'Payment successful!' });}
                       else{
                            dropin.setStatus('error');
                            dropin.setStatus('error', { message: 'Something went wrong.'});
                            }
                      })
                      .catch(error => {
                        throw Error(error);
                      });
                      /* console.log(action.action.resultCode);
                      if(action.action.resultCode=='Authorised' || action.action.resultCode=='Received'){
                              dropin.setStatus('success');
                          dropin.setStatus('success', { message: 'Payment successful!' });}
                          else{
                              dropin.setStatus('error');
                              dropin.setStatus('error', { message: 'Something went wrong.'});
                          }  */
             
                 }

                 
            }
            
            ) 
            .mount('#dropin-container');
           
            
    });
   

 
   
});

