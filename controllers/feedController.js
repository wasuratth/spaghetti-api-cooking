
const Post = require('../models/postModel');
const User = require('../models/userModel');
const ObjectId = require('mongoose').Types.ObjectId; 


const  getPostByUserId = async (user_id) => {
    return Post.find({user_id : new ObjectId(user_id ) }).select([ '_id' , 'text' , 'user_id' , 'createdAt' , 'updatedAt'])
    .populate({ path: 'user', select: ['name', 'picture']  })
    .populate({ path: 'comments', 
        select: ['text','user' ,  'user_id' , 'createdAt' , 'updatedAt' ] , 
        populate : {
            path : 'user' , 
            select: ['name', 'picture'] 
        }})
    .exec() ; 
}


module.exports.index = async (req, res , next ) => {
    const { _id : user_id } =  req.user ; 
    const posts = await getPostByUserId(user_id)  ;  
    res.status(200).json({ data: posts , success: true , msg : '' } );
}



module.exports.getFeedByUserId = async (req, res, next ) => {
    const { _id : user_id } =  req.params ; 
    const posts = await getPostByUserId(user_id)  ;  
    res.status(200).json(users);
}