

// add listener to ebook-button
document.getElementById('ebook-button').addEventListener('click', function() {
    // mount rebilly instruments
    RebillyInstruments.mount({
        publishableKey: 'pk_sandbox_xYh76FWucrGzClSBRDMHxUR9HsuuKM0xm_9I00V',
        organizationId: 'summer-nest---phronesis',
        websiteId: 'rebilly.com',
        apiMode: 'sandbox',
        items: [
        {
            planId: 'ebook-pricing',
            quantity: 1,
            thumbnail: 'https://api-sandbox.rebilly.com/files/file_01J4F2DA4KFCYRRWRWPKTWTRGT/permalink/c9cc5246-8a18-49e8-b552-c836e8e61803',
        },
    ],})
})


document.getElementById('hat-button').addEventListener('click', function() {
    // mount rebilly instruments
    RebillyInstruments.mount({
        publishableKey: 'pk_sandbox_xYh76FWucrGzClSBRDMHxUR9HsuuKM0xm_9I00V',
        organizationId: 'summer-nest---phronesis',
        websiteId: 'rebilly.com',
        apiMode: 'sandbox',
        items: [
            {
                planId: 'hat',
                quantity: document.getElementById('hat-quantity').value,
                thumbnail: 'https://api-sandbox.rebilly.com/files/file_01J4F2DA4KFCYRRWRWPKTWTRGT/permalink/c9cc5246-8a18-49e8-b552-c836e8e61803',
            },
        ],})
})