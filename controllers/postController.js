
const Post = require('../models/postModel');

module.exports.index = async (req, res, next) => {
    
    try {
        const posts = await Post.find();
        res.status(200).json({
            success: true,
            data: posts
        });
    } catch (err) {
        next(err);
    }

}

module.exports.getPostById = async  (req, res, next) => {
    const {id} = req.params ; 
    let post = Post.findById(id);
    res.status(200).json(post);
}

module.exports.getPostByUser = async (req, res, next) => {
    const { _id : user_id } = req.user;
    let post = await Post.find({user_id : user_id }).exec() ;
    res.status(200).json(post);
}

module.exports.createPost = async (req, res) => {
    const { _id : user_id } = req.user ; 
    const { text } = req.body ;
     let post = new Post({
        user_id : user_id ,
        text: text
    });

    try {
        await post.save();
        res.status(201).json({ data: post , success: true , msg : '' });
    } catch (err) {
        res.status(500).json({  errors: { err } });
    }
}
 

module.exports.updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { text } = req.body;

        const post = await Post.updateOne({ _id : id },
            { text: text }
        );

 
        if (post.nModified === 0) {
            throw new Error('Cannot update');
        } else {
            res.status(201).json(
                {
                    message: "Update completed",
                    success: true
                });
        }
    } catch (err) {
        res.status(500).json({
            error: [{
                code: 500,
                message: err.message
            }]
        });
    }
}

module.exports.deletePost = async function (req, res) {
    try {
        const { id } = req.params;
        const post = await Post.findByIdAndDelete(id);
        if (!post) {
            res.status(404).json({
                success: fasle, errors: {
                    message: "Cannot delete"
                }
            });
        }

        res.status(200).json({
            message: 'Deleted have been completed',
            success: true,
        });
    } catch (err) {
        res.status(500).json({
            errors: {
                success: fasle,
                message: "Cannot delete"
            }
        })
    }
}