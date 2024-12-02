const express = require('express');
const stripeController = require('../controller/stripeController');

const router = express.Router();

// Route to create a new customer
router.post('/create-customer', stripeController.createCustomer);

// Route to create a payment intent
router.post('/create-payment-intent', stripeController.createPaymentIntent);

// Route to create a subscription
router.post('/create-subscription', stripeController.createSubscription);

// Route to handle Stripe webhooks
router.post('/webhook', stripeController.handleWebhook);

module.exports = router;