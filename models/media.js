const mongoose = require('mongoose');

const { Schema } = mongoose;

const MediaSchema = new Schema({
  location: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  // views
  // likes
}, { timestamps: true });

module.exports = mongoose.model('Media', MediaSchema);
