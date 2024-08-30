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
    },
    addons: [
        {
            planId: 'personalized-travel-plan',
            quantity: 1,
        },
    ],
    bumpOffer: [
        {
            planId: 'monthly-platinum',
            quantity: 1,
        },
    ],
    features: {
        hideContinue: true,
    }
}).then(() => {
    console.log('Instruments mounted');
});

// Optional
RebillyInstruments.on('instrument-ready', (instrument) => {
    console.info('instrument-ready', instrument);
});
RebillyInstruments.on('purchase-completed', (purchase) => {
    console.info('purchase-completed', purchase);
});

const appState = {
    isMonthly: true,
    plan: ['yearly', 'monthly'],
    bumpOfferPlan: ['yearly-platinum', 'monthly-platinum']
};

async function updatePlan(e) {
    e.preventDefault();
    e.target.disabled = true;

    appState.isMonthly = !appState.isMonthly;

    //const updatedLocale = appState.localeChanged ? 'es' : 'en';
    updatePlanButton.textContent = appState.isMonthly ? 'Switch to yearly plan' : 'Switch to monthly plan';
    const newConfig = {
        items: [
            {
                planId: appState.plan[+appState.isMonthly],
                quantity: 1,
                thumbnail: 'https://api-sandbox.rebilly.com/files/file_01J4F2DA4KFCYRRWRWPKTWTRGT/permalink/c9cc5246-8a18-49e8-b552-c836e8e61803',
            },
        ],
        bumpOffer: [
            {
                planId: appState.bumpOfferPlan[+appState.isMonthly],
                quantity: 1,
            },
        ],
    };
    try {
        await RebillyInstruments.update(newConfig);
    } catch (error) {
        console.log('Error updating instruments: ', error);
    } finally {
        e.target.disabled = false;
    }
}

const updatePlanButton = document.getElementById('update-plan');
updatePlanButton.addEventListener('click', updatePlan);


const termsAndConditions = document.getElementById('terms-and-conditions');
termsAndConditions.addEventListener('change', () => {
    const newConfig = {
        features: {hideContinue: !termsAndConditions.checked}
    };
    RebillyInstruments.update(newConfig);
});


