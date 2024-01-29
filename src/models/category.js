const mongoose = require('mongoose');
const timestamp = require('mongoose-timestamp');

const categorySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  categoryName: { type: String, required: true },
  type: { type: String, required: true },
  image: { type: String, required: true },
});
categorySchema.plugin(timestamp);

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;