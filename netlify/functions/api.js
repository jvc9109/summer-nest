import express, {Router} from "express";
import serverless from "serverless-http";
import RebillyAPI from "rebilly-js-sdk";

export async function handler(event, context) {
    const app = express();
    const router = Router();
    router.use(express.json());

    const api = RebillyAPI({
        apiKey: process.env.REBILLY_API_KEY,
        organizationId: 'summer-nest---phronesis',
        sandbox: true
    });

    router.get('/hello', (req, res) => {
        res.send('Hello World');
    });

    router.post('/makedonation', async (req, res) => {
        // req.body is a binary, how to get the body params
        const {amount, paymentType} = req.body;

        console.log(req.body);

        const customer = await api.customers.get({id: 'cus_01J6HNWJ61NBF3JGA8XH76SVE2'});
        const data = {
            mode: 'passwordless',
            customerId: customer.fields.id,
        };
        const {fields: login} = await api.customerAuthentication.login({
            data,
        });
        const {fields: exchangeToken} =
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
                                'StorefrontGetAccount',
                                'StorefrontGetPlanCollection',
                                'StorefrontPostPreviewPurchase',
                                "StorefrontPostPaymentInstrument",
                                "StorefrontGetPaymentInstrument",
                                "StorefrontGetPaymentInstrumentCollection",
                                "StorefrontPostReadyToPay",
                                "StorefrontGetPaymentInstrumentSetup",
                                "StorefrontPostPaymentInstrumentSetup",
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
        }
        if (paymentType === 'one-time') {
            subsData.items = [
                {
                    quantity: 1,
                    plan: {
                        id: 'donation-one-time',
                        name: 'flexible-donation',
                        productId: 'donation',
                        currency: 'USD',
                        pricing: {
                            formula: 'fixed-fee',
                            price: amount
                        }
                    }
                }
            ];
        } else {
            subsData.items = [
                {
                    plan: {
                        id: 'donation-monthly',
                        name: 'flexible-donation',
                        productId: 'donation',
                        currency: 'USD',
                        pricing: {
                            formula: 'fixed-fee',
                            price: amount
                        },
                        recurringInterval: {
                            unit: 'month',
                            length: 1
                        }
                    }
                }
            ];
        }
        try {
            const subscription = await api.subscriptions.create({data: subsData});
            return res.json({
                jwt: exchangeToken.token,
                invoiceId: subscription.fields.initialInvoiceId
            });
        } catch (e) {
            console.log(e)
        }


    });

    router.get('/getinvoices', async (req, res) => {
        const invoices = await api.invoices.getAll({
            filter: 'customerId:cus_01J6HNWJ61NBF3JGA8XH76SVE2',
            sort: 'createdTime:desc'
        });

        const data = {
            mode: 'passwordless',
            customerId: 'cus_01J6HNWJ61NBF3JGA8XH76SVE2',
        };
        const {fields: login} = await api.customerAuthentication.login({
            data,
        });
        const {fields: exchangeToken} =
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
                                'StorefrontGetAccount',
                                'StorefrontGetPlanCollection',
                                'StorefrontPostPreviewPurchase',
                                "StorefrontPostPaymentInstrument",
                                "StorefrontGetPaymentInstrument",
                                "StorefrontGetPaymentInstrumentCollection",
                                "StorefrontPostReadyToPay",
                                "StorefrontGetPaymentInstrumentSetup",
                                "StorefrontPostPaymentInstrumentSetup",
                            ],
                        },
                    ],
                    customClaims: {
                        websiteId: 'rebilly.com',
                    },
                },
            });

        res.json({
            invoices: invoices.items.map((invoice) => {
                return invoice.fields;
            }),
        });
    });

    app.use('/api/', router);

    return serverless(app)(event, context);
}



