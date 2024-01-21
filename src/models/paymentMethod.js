const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const paymentMethodSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  paymentMethodName: { type: String, required: true },
});
paymentMethodSchema.plugin(timestamp);

const PaymentMethod = mongoose.model("PaymentMethod", paymentMethodSchema);
module.exports = PaymentMethod;