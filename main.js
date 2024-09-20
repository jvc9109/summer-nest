const bookingAmount = 2000;

function project6 () {
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
}

//take this json from /api/getinvoices make a table in html with ID, Due Time, Issued Time, Amount, Status, Payment Form URL, created time

fetch('/api/getinvoices')
.then(response => response.json())
.then(data => {
    const table = document.getElementById('invoice-table');
    data.invoices.forEach(invoice => {
        const row = table.insertRow();
        row.insertCell(0).textContent = invoice.id;
        row.insertCell(1).textContent = invoice.dueTime;
        row.insertCell(2).textContent = invoice.issuedTime;
        row.insertCell(3).textContent = `${invoice.amount} $`;
        row.insertCell(4).textContent = invoice.status;
        row.insertCell(5).innerHTML = invoice.paymentFormUrl ? `<a href=${invoice.paymentFormUrl}> Pay Now </a>` : 'Paid';
        row.insertCell(6).textContent = invoice.createdTime;
    });
});

