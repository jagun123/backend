const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Transaction = require('../models/Transaction');

exports.createPaymentIntent = async (req, res) => {
  const { amount, description, currency, shipping } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // amount in smallest currency unit
      currency: currency || 'usd', // default to 'usd' if not provided
      description: description,
      shipping: shipping,
    });

    res.status(200).json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unable to create payment intent. Please try again.' });
  }
};

exports.saveTransaction = async (req, res) => {
  const { name, amount, description, transactionId, shipping } = req.body;

  try {
    const newTransaction = new Transaction({ name, amount, description, transactionId, shipping });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to save transaction. Please try again.' });
  }
};
