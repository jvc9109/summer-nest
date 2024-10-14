Framepay.initialize({
    publishableKey: 'pk_sandbox_xYh76FWucrGzClSBRDMHxUR9HsuuKM0xm_9I00V',
    organizationId: 'summer-nest---phronesis',
    websiteId: 'rebilly.com',
    apiMode: 'sandbox',
    transactionData: {
        currency: 'USD',
        amount: 10,
    },
});

Framepay.on('ready', function () {
    const card = Framepay.card.mount('#mounting-point');
});

const form = document.getElementById('payment-form');

// on form in funnel.html submit, call Framepay.card.submit()
form.addEventListener('submit', async function (event) {
    event.preventDefault();
    try {
        const paymentToken = await Framepay.createToken(form);
        //send to own api the token
        console.log('✅ Payment token:', paymentToken);
        const result = await fetch('/api/funnel',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    tokenId: paymentToken.id
                }),
            });

        console.log(await result.json());

    } catch(error){
        console.log('❌ Create token error:', error);
    }
});
