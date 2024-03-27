const mongoose = require("mongoose");

const contactSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: false },
  imageUrl: { type: String, required: false },
  group: { type: Array, required: false },
});

module.exports = mongoose.model('Post', contactSchema)