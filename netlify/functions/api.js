import express, { Router } from "express";
import serverless from "serverless-http";
import RebillyAPI from "rebilly-js-sdk";

export async function handler(event, context) {
    const app = express();
    const router = Router();

    const api = RebillyAPI({
        apiKey: process.env.REBILLY_API_KEY,
        organizationId: 'summer-nest---phronesis',
        sandbox: true
    });

    router.get('/hello', (req, res) => {
        res.send('Hello World');
    });

    router.post('/makedonation', async (req, res) => {

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

    app.use('/api/', router);

    return serverless(app)(event, context);
}



