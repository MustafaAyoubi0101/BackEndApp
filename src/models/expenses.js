const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const expensesSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  expensesAmount: { type: String, required: true },
  category: { type: String, default: "Other" },
  paymentMethod: { type: String, defalut: "Others"},
  notes: { type: String },
  date: { type: Date, default: Date.now },
});
expensesSchema.plugin(timestamp);

const Expenses = mongoose.model("Expenses", expensesSchema);
module.exports = Expenses;