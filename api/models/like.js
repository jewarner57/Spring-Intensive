const mongoose = require('mongoose');

const { Schema } = mongoose;

const LikeScheme = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  media: { type: Schema.Types.ObjectId, ref: 'Media', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Like', LikeScheme);
