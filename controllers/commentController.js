const mongoose = require('mongoose');
const Comment = require('../models/commentModel');
const Menu = require('../models/menuModel');



module.exports.index = async function (req, res, next) {
    // select * from post; 

    try {

        const posts = await Comment.find();
        res.status(200).json({
            data: posts
        });

    } catch (err) {
        res.status(500).json(
            {
                errors: err
            });
    }
}

module.exports.getCateById = async (req, res, next) => {
    const { m_id } = req.params;
    const post = await Comment.findOne({ _m_id: m_id });
    res.status(200).json({ data: { post } });
}


module.exports.createComment = async (req, res) => {

    const { _id: user_id } = req.user;
    const { menu_id, cm_detail = "", cm_point = 0 } = req.body;

    await Comment.deleteMany({ user: user_id, menu: menu_id });

    let comment = new Comment({
        user: user_id,
        menu: menu_id,
        cm_detail: cm_detail,
        cm_point: cm_point
    });



    try {

        await comment.save();

        const avgLisg = await Comment.aggregate([{ $match: { menu: mongoose.Types.ObjectId(menu_id) } }, { $group: { _id: "$menu", pop: { $avg: "$cm_point" } } }]).exec();
        const [avg] = avgLisg;
        console.log('AVG = ', avg);
        
        await Menu.findByIdAndUpdate(menu_id, { star: avg.pop }).exec();

        res.status(201).json({ success: true, message: "", data: comment });
    } catch (err) {
        res.status(500).json({
            errors: { err }
        });
    }
}

module.exports.getCommentByMenuId = async (req, res, next) => {
    const { menu_id } = req.params;
    const comments = await Comment.find({ menu: menu_id }).populate("user").sort({ createdAt: 'desc' }).exec();
    res.status(200).json({ success: true, message: "", data: comments });
}





module.exports.updatePost = async (req, res) => {
    try {
        const { cm_id } = req.params;
        const { m_id, u_id, cm_detail, cm_point, cm_date } = req.body;

        const comment = await Comment.updateOne({ _cm_id: cm_id },
            {
                cm_id: cm_id,
                m_id: m_id,
                u_id: u_id,
                cm_detail: cm_detail,
                cm_point: cm_point,
                cm_date: cm_date
            }
        );


        if (comment.nModified === 0) {
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


module.exports.createPost = async (req, res) => {
    //const { _id : c_id,m_id : m_id } = req.user ; 
    const { cm_id: cm_id,
        m_id: m_id,
        u_id: u_id,
        cm_detail: cm_detail,
        cm_point: cm_point,
        cm_date: cm_date } = req.body;
    let comment = new Comment({
        cm_id: cm_id,
        m_id: m_id,
        u_id: u_id,
        cm_detail: cm_detail,
        cm_point: cm_point,
        cm_date: cm_date

    });

    try {
        await comment.save();
        res.status(201).json({ data: comment, success: true, msg: '' });
    } catch (err) {
        res.status(500).json({ errors: { err } });
    }
}


module.exports.deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.params)
        //const { _id: _id } = req.body ;
        const comment = await Comment.findByIdAndDelete(id);
        if (!comment) {
            res.status(404).json({
                success: false, errors: {
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
                success: false,
                message: "Cannot delete"
            }
        })
    }
}
