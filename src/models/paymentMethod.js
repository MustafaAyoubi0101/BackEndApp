const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const paymentMethodSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: { type: String, required: true },
});
paymentMethodSchema.plugin(timestamp);

const PaymentMethod = mongoose.model("PaymentMethod", paymentMethodSchema);
module.exports = PaymentMethod;