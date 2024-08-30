RebillyInstruments.mount({
    publishableKey: 'pk_sandbox_xYh76FWucrGzClSBRDMHxUR9HsuuKM0xm_9I00V',
    organizationId: 'summer-nest---phronesis',
    websiteId: 'rebilly.com',
    apiMode: 'sandbox',
    items: [
        {
            planId: 'monthly',
            quantity: 1,
            thumbnail: 'https://api-sandbox.rebilly.com/files/file_01J4F2DA4KFCYRRWRWPKTWTRGT/permalink/c9cc5246-8a18-49e8-b552-c836e8e61803',
        },
    ],
    paymentInstruments: {
        address: {
            show: ['email', 'phoneNumber', 'country', 'city'],
        }
    },
    theme: {
        colorPrimary: '#3D3839',
    }
});
// Optional
RebillyInstruments.on('instrument-ready', (instrument) => {
    console.info('instrument-ready', instrument);
});
RebillyInstruments.on('purchase-completed', (purchase) => {
    console.info('purchase-completed', purchase);
});
