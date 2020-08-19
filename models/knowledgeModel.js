const mongoose = require('mongoose');

const knowledgeSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  detail: { type: String, required: true, trim: true },
  image: { type: String, trim: true },
  viewcount: { type: Number, default: 0 },
}, {
  toJSON: { virtuals: true },
  timestamps: true,
  collection: 'Knowledge'
});

const knowledge = mongoose.model('Knowledge', knowledgeSchema);


module.exports = knowledge;