const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  detail: { type: String, trim: true },
  picture: { type: String, trim: true },
  group: { type: String, trim: true },
  step: { type: Array },
  ingredients: { type: Array },
  viewcount: { type: Number, default: 0 },
  star: { type: Number, default: 0 },
  user: { type: mongoose.Types.ObjectId, ref: 'User' }
}, {
  toJSON: { virtuals: true },
  timestamps: true,
  collection: 'Menu'
});

const menu = mongoose.model('Menu', menuSchema);


module.exports = menu;