const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  user : { type: mongoose.Schema.Types.ObjectId , ref: 'User'   },
  contenttype : { type: String , default : '' , require: true  } , 
  image : { type: Buffer , default : '' , require: true  } 
}, {
  toJSON: { virtuals: true },
  timestamps: true,
  collection: 'Picture'
});

const picture = mongoose.model('Picture', schema);

module.exports = picture ;