const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  user_id : { type: mongoose.Schema.Types.ObjectId , required: true },
  text: { type: String , required: true , trim: true },
  img : { type: String , trim: true } ,
}, {
  toJSON: {virtuals: true} ,
  timestamps: true,
  collection: 'Post'
});

postSchema.virtual('comments', {
  ref: 'Comment', //ลิงก์ไปที่โมเดล Comment
  localField: '_id', //_id ฟิลด์ของโมเดล Post (ไฟล์นี้)
  foreignField: 'post_id' //post ฟิลด์ของโมเดล Comment (fk)
});


postSchema.virtual('user', {
  ref: 'User', //ลิงก์ไปที่โมเดล Comment
  localField: 'user_id', //_id ฟิลด์ของโมเดล Post (ไฟล์นี้)
  foreignField: '_id' ,  //post ฟิลด์ของโมเดล Comment (fk)
  justOne: true 
});

const post = mongoose.model('Post', postSchema );

module.exports = post;