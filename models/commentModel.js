const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  menu : { type: mongoose.Schema.Types.ObjectId , ref : 'Menu' },
  user : { type: mongoose.Schema.Types.ObjectId , ref : 'User' }, 
  cm_detail: { type: String, trim: true },
  cm_point: { type: Number , default : 0  } 
}, {
  toJSON: {virtuals: true},
  timestamps: true,
  collection: 'Comment'
});


const comment = mongoose.model('Comment', schema);

module.exports = comment; 