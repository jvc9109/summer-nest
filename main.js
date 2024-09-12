const bookingAmount = 2000;


//when click button with id 20p-deposit, update RebillyInstruments
document.getElementById('20p-deposit').addEventListener('click', function() {
    RebillyInstruments.destroy();
    RebillyInstruments.mount({
        publishableKey: 'pk_sandbox_xYh76FWucrGzClSBRDMHxUR9HsuuKM0xm_9I00V',
        organizationId: 'summer-nest---phronesis',
        websiteId: 'rebilly.com',
        apiMode: 'sandbox',
        money: {
            amount: bookingAmount*0.2,
            currency: 'USD'
        },

        paymentInstruments: {
            address: {
                show: ['email', 'phoneNumber', 'country', 'city'],
            }
        },
        theme: {
            colorPrimary: '#3D3839',
        }
    });
});

document.getElementById('30p-deposit').addEventListener('click', function() {
    RebillyInstruments.destroy();
    RebillyInstruments.mount({
        publishableKey: 'pk_sandbox_xYh76FWucrGzClSBRDMHxUR9HsuuKM0xm_9I00V',
        organizationId: 'summer-nest---phronesis',
        websiteId: 'rebilly.com',
        apiMode: 'sandbox',
        money: {
            amount: bookingAmount*0.3,
            currency: 'USD'
        },

        paymentInstruments: {
            address: {
                show: ['email', 'phoneNumber', 'country', 'city'],
            }
        },
        theme: {
            colorPrimary: '#3D3839',
        }
    });
});

document.getElementById('50p-deposit').addEventListener('click', function() {
    RebillyInstruments.destroy();
    RebillyInstruments.mount({
        publishableKey: 'pk_sandbox_xYh76FWucrGzClSBRDMHxUR9HsuuKM0xm_9I00V',
        organizationId: 'summer-nest---phronesis',
        websiteId: 'rebilly.com',
        apiMode: 'sandbox',
        money: {
            amount: bookingAmount*0.5,
            currency: 'USD'
        },

        paymentInstruments: {
            address: {
                show: ['email', 'phoneNumber', 'country', 'city'],
            }
        },
        theme: {
            colorPrimary: '#3D3839',
        }
    });
});

document.getElementById('custom-deposit').addEventListener('click', function() {
    RebillyInstruments.destroy();
    const customAmount = parseFloat(document.getElementById('deposit-amount').value);


    RebillyInstruments.mount({
        publishableKey: 'pk_sandbox_xYh76FWucrGzClSBRDMHxUR9HsuuKM0xm_9I00V',
        organizationId: 'summer-nest---phronesis',
        websiteId: 'rebilly.com',
        apiMode: 'sandbox',
        money: {
            amount: Math.max(bookingAmount*0.2, Math.min(customAmount, bookingAmount )),
            currency: 'USD'
        },

        paymentInstruments: {
            address: {
                show: ['email', 'phoneNumber', 'country', 'city'],
            }
        },
        theme: {
            colorPrimary: '#3D3839',
        }
    });
});
