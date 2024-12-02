const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET); // Replace with your actual secret key

class StripeService {
  /**
   * Create a new customer
   * @param {Object} customerDetails - Contains email, name, etc.
   */
  async createCustomer(customerDetails) {
    try {
      const customer = await stripe.customers.create(customerDetails);
      return customer;
    } catch (error) {
      throw new Error(`Failed to create customer: ${error.message}`);
    }
  }

  /**
   * Create a payment intent
   * @param {Number} amount - Amount in cents
   * @param {String} currency - Currency (e.g., 'usd')
   */
  async createPaymentIntent(amount, currency) {
    try {
      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
      });
      return paymentIntent;
    } catch (error) {
      throw new Error(`Failed to create payment intent: ${error.message}`);
    }
  }

  /**
   * Create a subscription
   * @param {String} customerId - ID of the customer
   * @param {String} priceId - ID of the price plan
   */
  async createSubscription(customerId, priceId) {
    try {
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [{ price: priceId }],
      });
      return subscription;
    } catch (error) {
      throw new Error(`Failed to create subscription: ${error.message}`);
    }
  }

  /**
   * Handle webhook events from Stripe
   * @param {Buffer} rawBody - Raw request body
   * @param {String} signature - Stripe signature header
   * @param {String} webhookSecret - Your webhook secret
   */
  handleWebhook(rawBody, signature, webhookSecret) {
    try {
      const event = stripe.webhooks.constructEvent(rawBody, signature, webhookSecret);
      return event; // Return the event for further processing
    } catch (error) {
      throw new Error(`Webhook error: ${error.message}`);
    }
  }
}

module.exports = new StripeService();
