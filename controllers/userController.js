
const Post = require('../models/postModel');
const ObjectId = require('mongoose').Types.ObjectId; 

 
module.exports.index = async (req, res , next ) => {
    const { _id : user_id } =  req.user ; 
    const posts = await getPostByUserId(user_id)  ;  
    res.status(200).json({ data: posts , success: true , msg : '' } );
}



 