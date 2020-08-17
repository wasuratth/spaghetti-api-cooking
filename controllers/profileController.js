
const User = require('../models/userModel');
const ObjectId = require('mongoose').Types.ObjectId; 

 
module.exports.getMyProfile = async (req, res , next ) => {
    const { _id : user_id } =  req.user ; 
    const user = await User.findById(user_id).select(['name' , 'username' , 'picture' , 'createAt' , 'updateAt' , 'isDetele']) ;  
    res.status(200).json({ data: user , success: true , msg : '' } );
}

module.exports.changeMyPassword = async (req, res , next ) => {
    const { _id : user_id } =  req.user ; 
    const { oldpassword ,  newpassword  } =  req.body ; 
     
    try {
        const user = await User.findById(user_id) ; 

        const isMatch = await user.comparePassword(oldpassword);
        
        if (!isMatch) {
            const error = new Error('รหัสผ่านเดิมไม่ถูกค้อง');
            error.statusCode = 401; 
            throw error;
        }

        user.password = await user.encryptPassword(newpassword) ; 
        user.save();

        res.status(200).json({ success: true , data: {}  , msg : "ได้ทำการเปลี่ยนรหัสผ่านแล้ว" } );
    }catch (err) {
        next(err);
    }

}
