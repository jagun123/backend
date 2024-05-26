const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  name: String,
  amount: Number,
  transactionId: String,
});

module.exports = mongoose.model('Transaction', transactionSchema);