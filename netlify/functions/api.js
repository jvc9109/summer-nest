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

    // create endpoint to create order and return invoiceId
    router.post('/makeorder', async (req, res) => {
        // take planId and quantity from req.body

        const {planId, quantity} = req.body;

        console.log(req.body);

        const customer = await api.customers.get({id: 'cus_01J6HNWJ61NBF3JGA8XH76SVE2'});
        const data = {
            mode: 'passwordless',
            customerId: customer.fields.id,
        };
        const {fields: login} = await api.customerAuthentication.login({
            data,
        });


        const subsData =
            {
                customerId: 'cus_01J6HNWJ61NBF3JGA8XH76SVE2',
                websiteId: 'rebilly.com',
                orderType: 'one-time-order',
                items: [
                    {
                        plan: {
                            id: planId,
                        },
                        quantity: +quantity,
                    }
                ],

            };
        try {
            const subscription = await api.subscriptions.create({data: subsData});


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
                                    "PostToken",
                                    "PostDigitalWalletValidation",
                                    "StorefrontGetAccount",
                                    "StorefrontPatchAccount",
                                    "StorefrontPostPayment",
                                    "StorefrontGetTransactionCollection",
                                    "StorefrontGetTransaction",
                                    "StorefrontGetPaymentInstrumentCollection",
                                    "StorefrontPostPaymentInstrument",
                                    "StorefrontGetPaymentInstrument",
                                    "StorefrontPatchPaymentInstrument",
                                    "StorefrontPostPaymentInstrumentDeactivation",
                                    "StorefrontGetWebsite",
                                    "StorefrontGetInvoiceCollection",
                                    "StorefrontGetInvoice",
                                    "StorefrontGetProductCollection",
                                    "StorefrontGetProduct",
                                    "StorefrontPostReadyToPay",
                                    "StorefrontPostReadyToPayout",
                                    "StorefrontGetPaymentInstrumentSetup",
                                    "StorefrontPostPaymentInstrumentSetup",
                                    "StorefrontGetDepositRequest",
                                    "StorefrontGetDepositStrategy",
                                    "StorefrontGetPayoutRequest",
                                    "StorefrontGetPayoutRequestCollection",
                                    "StorefrontPatchPayoutRequest",
                                ],
                            },
                        ],
                        customClaims: {
                            websiteId: 'rebilly.com',
                            invoiceId: subscription.fields.recentInvoiceId,
                        },
                    },
                });


            return res.json({
                jwt: exchangeToken.token,
                invoiceId: subscription.fields.recentInvoiceId
            });
        } catch (e) {
            console.log(e)
        }
    });

    router.post('/funnel', async (req, res) => {

        const {tokenId} = req.body;

        const transactionData = {
            customerId: 'cus_01J6HNWJ61NBF3JGA8XH76SVE2',
            type: 'sale',
            websiteId: 'rebilly.com',
            paymentInstruction: {
                token: tokenId,
            },
            currency: 'USD',
            amount: 10.99,
            description: 'funnel',
        };

        try {
            const transaction = await api.transactions.create({data: transactionData});
            return res.json({result: transaction.fields.result});

        } catch (e) {
            console.log(e)

        }

    });

    router.post('/deposit-request', async (req, res) => {

        console.log(req.body);

        const customerId = 'cus_01J6HNWJ61NBF3JGA8XH76SVE2';
        const response = {};
        const data = {
            mode: "passwordless",
            customerId,
        };

        const rebilly = RebillyAPI({
            apiKey: process.env.REBILLY_API_KEY,
            organizationId: 'summer-nest---phronesis',
            sandbox: true
        });

        const { fields: login } = await rebilly.customerAuthentication.login({
            data,
        });

        const { fields: exchangeToken } =
            await rebilly.customerAuthentication.exchangeToken({
                token: login.token,
                data: {
                    acl: [
                        {
                            scope: {
                                organizationId: ["summer-nest---phronesis"],
                            },
                            permissions: [
                                "PostToken",
                                "PostDigitalWalletValidation",
                                "StorefrontGetAccount",
                                "StorefrontPatchAccount",
                                "StorefrontPostPayment",
                                "StorefrontGetTransactionCollection",
                                "StorefrontGetTransaction",
                                "StorefrontGetPaymentInstrumentCollection",
                                "StorefrontPostPaymentInstrument",
                                "StorefrontGetPaymentInstrument",
                                "StorefrontPatchPaymentInstrument",
                                "StorefrontPostPaymentInstrumentDeactivation",
                                "StorefrontGetWebsite",
                                "StorefrontGetInvoiceCollection",
                                "StorefrontGetInvoice",
                                "StorefrontGetProductCollection",
                                "StorefrontGetProduct",
                                "StorefrontPostReadyToPay",
                                "StorefrontGetPaymentInstrumentSetup",
                                "StorefrontPostPaymentInstrumentSetup",
                                "StorefrontGetDepositRequest",
                                "StorefrontGetDepositStrategy",
                                "StorefrontPostDeposit",
                            ],
                        },
                    ],
                    customClaims: {
                        websiteId: 'rebilly.com',
                    },
                },
            });

        const requestDepositData = {
            websiteId: 'rebilly.com',
            customerId: 'cus_01J6HNWJ61NBF3JGA8XH76SVE2',
            currency: "USD",
            amounts: [10, 20, 30, 40],
            amountLimits: {
                "minimum": 10,
                "maximum": 5000
            },
        };

        const { fields: depositFields } = await rebilly.depositRequests.create({
            data: requestDepositData,
        });

        response.token = exchangeToken.token;
        response.depositRequestId = depositFields.id;
        res.send(response);
    });

    app.use('/api/', router);

    return serverless(app)(event, context);
}



