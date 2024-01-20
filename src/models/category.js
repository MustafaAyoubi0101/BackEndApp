const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const categorySchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  name: { type: String, required: true },
  type: { type: String, required: true, enum: ['Expenses, Income'] },
});
categorySchema.plugin(timestamp);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;