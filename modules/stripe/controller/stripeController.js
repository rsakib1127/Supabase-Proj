
// Create a new customer
const StripeService = require('../service/stripe.Service');

const createCustomer = async (req, res) => {
  try {
    const customer = await StripeService.createCustomer(req.body);
    res.status(200).json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createPaymentIntent = async (req, res) => {
  try {
    const paymentIntent = await StripeService.createPaymentIntent(req.body.amount, req.body.currency);
    res.status(200).json(paymentIntent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createSubscription = async (req, res) => {
  try {
    const subscription = await StripeService.createSubscription(req.body.customerId, req.body.priceId);
    res.status(200).json(subscription);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const handleWebhook = async (req, res) => {
  try {
    const event = StripeService.handleWebhook(req.body, req.headers['stripe-signature'], process.env.WEBHOOK_SECRET);

    switch (event.type) {
      case 'payment_intent.succeeded':
        console.log('Payment succeeded:', event.data.object);
        break;
      // Add more event types as needed
      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    res.json({ received: true });
  } catch (error) {
    res.status(400).send(`Webhook Error: ${error.message}`);
  }
};

module.exports = {
  createCustomer,
  createPaymentIntent,
  createSubscription,
  handleWebhook,
};
