const mongoose = require('mongoose');

const FrinendSchema = new mongoose.Schema({
  user_id_1 : { type: ObjectId , required: true , ref : 'User'  },
  user_id_2 : { type: ObjectId , required: true , ref : 'User'  },
  statusFriend : { type: Number , default : 0  }
 }, {
  toJSON: {virtuals: true} ,
  timestamps: true,
  collection: 'Friend'
});

// postSchema.virtual('User', { 
//   ref: 'User', //ลิงก์ไปที่โมเดล Comment
//   localField: '_id', //_id ฟิลด์ของโมเดล Post (ไฟล์นี้)
//   foreignField: 'post' //post ฟิลด์ของโมเดล Comment (fk)
// })

const friend = mongoose.model('Friend', FrinendSchema );

module.exports = friend;