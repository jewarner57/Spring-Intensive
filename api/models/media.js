const mongoose = require('mongoose');

const { Schema } = mongoose;

const MediaSchema = new Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  likes: { type: Number, required: true, default: 0 },
  comments: { type: Number, required: true, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Media', MediaSchema);
