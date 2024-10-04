

// add listener to ebook-button

document.getElementById('course-button').addEventListener('click', async function() {
    // mount rebilly instruments

    // pass planId and quantity in body

    const body = {
        planId: 'start-your-villa-rental-business',
        quantity: 1,
    }

    const response = await fetch('/api/makeorder',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

    const data = await response.json();

    RebillyInstruments.destroy();
    RebillyInstruments.mount({
        organizationId: 'summer-nest---phronesis',
        websiteId: 'rebilly.com',
        apiMode: 'sandbox',
        invoiceId: data.invoiceId,
        jwt: data.jwt,
    });
})

document.getElementById('ebook-button').addEventListener('click', async function() {
    // mount rebilly instruments

    // pass planId and quantity in body
    
    const body = {
        planId: 'ebook-pricing',
        quantity: 1,
    }
    
    const response = await fetch('/api/makeorder',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

    const data = await response.json();

    RebillyInstruments.destroy();
    RebillyInstruments.mount({
        organizationId: 'summer-nest---phronesis',
        websiteId: 'rebilly.com',
        apiMode: 'sandbox',
        invoiceId: data.invoiceId,
        jwt: data.jwt,
    });
})

document.getElementById('tshirt-button').addEventListener('click', async function() {
    const body = {
        planId: 'tshirt',
        quantity: +document.getElementById('tshirt-quantity').value,
    }

    const response = await fetch('/api/makeorder',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

    const data = await response.json();

    RebillyInstruments.destroy();
    RebillyInstruments.mount({
        organizationId: 'summer-nest---phronesis',
        websiteId: 'rebilly.com',
        apiMode: 'sandbox',
        invoiceId: data.invoiceId,
        jwt: data.jwt,
    });
})


document.getElementById('hat-button').addEventListener('click', async function() {
    const body = {
        planId: 'hat',
        quantity: +document.getElementById('hat-quantity').value,
    }

    const response = await fetch('/api/makeorder',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

    const data = await response.json();

    RebillyInstruments.destroy();
    RebillyInstruments.mount({
        organizationId: 'summer-nest---phronesis',
        websiteId: 'rebilly.com',
        apiMode: 'sandbox',
        invoiceId: data.invoiceId,
        jwt: data.jwt,
    });
})