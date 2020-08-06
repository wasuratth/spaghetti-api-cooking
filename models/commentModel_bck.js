const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user_id : { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  post_id : { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
  text: { type: String, required: true, trim: true }, 
}, {
  toJSON: { virtuals: true },
  timestamps: true,
  collection: 'Comment'
});

commentSchema.virtual('user', {
  ref: 'User', //ลิงก์ไปที่โมเดล Comment
  localField: 'user_id', //_id ฟิลด์ของโมเดล Post (ไฟล์นี้)
  foreignField: '_id' ,  //post ฟิลด์ของโมเดล Comment (fk)
  justOne: true 
}); 
 
const comment = mongoose.model('Comment', commentSchema);

module.exports = comment;