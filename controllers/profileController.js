
const User = require('../models/userModel');
const ObjectId = require('mongoose').Types.ObjectId; 

 
module.exports.getMyProfile = async (req, res , next ) => {
    const { _id : user_id } =  req.user ; 
    const user = await User.findById(user_id).select(['name' , 'picture' , 'createAt' , 'updateAt' , 'isDetele']) ;  
    res.status(200).json({ data: user , success: true , msg : '' } );
}



 