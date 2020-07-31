
const User = require('../models/userModel');
const ObjectId = require('mongoose').Types.ObjectId; 

 
module.exports.getMyProfile = async (req, res , next ) => {
    const { _id : user_id } =  req.user ; 
    const user = await User.findById(user_id).select(['name' , 'picture' , 'createAt' , 'updateAt' , 'isDetele']) ;  
    res.status(200).json({ data: user , success: true , msg : '' } );
}

module.exports.changeMyPassword = async (req, res , next ) => {
    const { _id : user_id } =  req.user ; 
    const { oldpassword ,  newpassword  } =  req.body ; 
    
    const user = await User.findById(user_id) ; 
    

    try {
        if(user.password !== await user.encryptPassword(oldpassword)){
            res.status(404).json({ success: false , data: {}  , msg : "รหัสผ่านเดิมไม่ถูกต้อง" } );
        }
        
        user.password = user.encryptPassword(oldpassword) ; 
        user.save();
        res.status(200).json({ success: true , data: {}  , msg : "" } );
    }catch (err) {
        next(err);
    }

}
