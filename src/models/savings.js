const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const savingsSchema = new mongoose.Schema({
  account_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  savingAmount: { type: String, required: true },
  savingMethod: { type: String, defalut: "Others"},
  notes: { type: String },
  date: { type: Date, default: Date.now },
});
savingsSchema.plugin(timestamp);

const Savings = mongoose.model("Savings", savingsSchema);
module.exports = Savings;