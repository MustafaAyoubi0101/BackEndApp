const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const accountsSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  accountName: { type: String, required: true },
  notes: { type: String },
});
accountsSchema.plugin(timestamp);

const Account = mongoose.model("Account", accountsSchema);
module.exports = Account;