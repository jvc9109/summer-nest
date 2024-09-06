const RebillyAPI = require('rebilly-js-sdk').default;
const express = require('express');
const fs = require('fs');



const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
    fs.readFile('index.html', 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        res.send(data);
    })
});

const api = RebillyAPI({ apiKey: '-----', organizationId: 'summer-nest---phronesis', sandbox: true });

app.post('/makedonation', async (req, res) => {

    const customer = await api.customers.get({id: 'cus_01J6HNWJ61NBF3JGA8XH76SVE2'});


    const data = {
        mode: 'passwordless',
        customerId: customer.fields.id,
    };
    const { fields: login } = await api.customerAuthentication.login({
        data,
    });
    const { fields: exchangeToken } =
        await api.customerAuthentication.exchangeToken({
            token: login.token,
            data: {
                acl: [
                    {
                        scope: {
                            organizationId: ['summer-nest---phronesis'],
                        },
                        permissions: [
                            'StorefrontGetInvoice',
                        ],
                    },
                ],
                customClaims: {
                    websiteId: 'rebilly.com',
                },
            },
        });
    //Create subs
    const subsData = {
        customerId: 'cus_01J6HNWJ61NBF3JGA8XH76SVE2',
        websiteId: 'rebilly.com',
        items: [
            {
                plan: {
                    id: 'donation-monthly',
                    name: 'flexible-donation',
                    productId: 'donation',
                    currency: 'USD',
                    pricing: {
                        formula: 'fixed-fee',
                        price: 10.00
                    },
                    recurringInterval: {
                        unit: 'month',
                        length: 1
                    }
                }
            }
        ]
    };
    const subscription = await api.subscriptions.create({data: subsData});

    console.log(subscription);

    //Return jwt and invoiceId
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});
