const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const incomeSchema = new mongoose.Schema({
  accountId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  incomeAmount: { type: Number, required: true },
  category: { type: String, default: "Other" },
  paymentMethod: { type: String, defalut: "Others"},
  note: { type: String },
  date: { type: Date, default: Date.now },
});
incomeSchema.plugin(timestamp);

const Income = mongoose.model("Income", incomeSchema);
module.exports = Income;