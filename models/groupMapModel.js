const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const User = require('./userModel');

const schema = new Schema({
  c_id: { type: String, required: true, trim: true },
  m_id: { type: mongoose.Schema.Types.ObjectId , ref: 'Menu' }
}, {
  toJSON: { virtuals: true },
  timestamps: true,
  collection: 'GroupMap'
});

const groupmap = mongoose.model('GroupMap', schema);

module.exports = groupmap;