const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//const User = require('./userModel');

const schema = new Schema({
  cm_id: { type: String, required: true, trim: true },
  m_id: { type: String, trim: true },
  u_id: { type: String, trim: true },
  cm_detail: { type: String, trim: true },
  cm_point: { type: String, trim: true },
  cm_date: { type: String, trim: true }

}, {
  toJSON: {virtuals: true},
  timestamps: true,
  collection: 'Comment'
});
// createdDate: { type: Date, default: Date.now}, 
/* 
schema.virtual('comments', {
  ref: 'Comment', //ลิงก์ไปที่โมเดล Comment
  localField: '_id', //_id ฟิลด์ของโมเดล Post (ไฟล์นี้)
  foreignField: 'post' //post ฟิลด์ของโมเดล Comment (fk)
}); */

const post = mongoose.model('Comment', schema);

module.exports = post;