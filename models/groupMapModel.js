const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const User = require('./userModel');

const schema = new Schema({
  m_id: { type: String, required: true, trim: true },
  c_id: { type: String, trim: true }
  
}, {
  toJSON: {virtuals: true},
  timestamps: true,
  collection: 'GroupMap'
});
// createdDate: { type: Date, default: Date.now}, 
/* 
schema.virtual('comments', {
  ref: 'Comment', //ลิงก์ไปที่โมเดล Comment
  localField: '_id', //_id ฟิลด์ของโมเดล Post (ไฟล์นี้)
  foreignField: 'post' //post ฟิลด์ของโมเดล Comment (fk)
}); */

const post = mongoose.model('GroupMap', schema);

module.exports = post;