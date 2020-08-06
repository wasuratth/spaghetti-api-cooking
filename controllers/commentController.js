const mongoose = require('mongoose');
const Comment = require('../models/commentModel');

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
    console.log(req.body);
    const { cm_id ,m_id,u_id,cm_detail,cm_point,cm_date} = req.body;
    let categ = new Comment({
        cm_id: cm_id,
        m_id : m_id,
        u_id : u_id,
        cm_detail : cm_detail,
        cm_point : cm_point,
        cm_date : cm_date
    });

    try {
        await categ.save();
        res.status(201).json({ data: { categ } }); 
    } catch (err) {
        res.status(500).json({
            errors: { err }
        });
    }
}


module.exports.updatePost = async (req, res) => {
    try {
        const { cm_id } = req.params;
        const { m_id,u_id,cm_detail,cm_point,cm_date} = req.body;

        const comment = await Comment.updateOne({ _cm_id : cm_id },
            { cm_id: cm_id,
                m_id : m_id,
                u_id : u_id,
                cm_detail : cm_detail,
                cm_point : cm_point,
                cm_date : cm_date }
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
        m_id : m_id,
        u_id : u_id,
        cm_detail : cm_detail,
        cm_point : cm_point,
        cm_date : cm_date } = req.body ;
     let comment = new Comment({
        cm_id: cm_id,
                m_id : m_id,
                u_id : u_id,
                cm_detail : cm_detail,
                cm_point : cm_point,
                cm_date : cm_date
    
    });

    try {
        await comment.save();
        res.status(201).json({ data: comment , success: true , msg : '' });
    } catch (err) {
        res.status(500).json({  errors: { err } });
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
                success: false ,
                message: "Cannot delete"
            }
        })
    }
}
/* 
module.exports.updateCate = async (req, res, next) => {
    try {
        const { c_id } = req.params;
        const { c_name } = req.body;
        console.log(req.body);
        console.log(`c_id : ${c_id}`);
        console.log(`c_name : ${c_name}`);
        const post = await category.updateOne({ c_id: c_id },
            { c_name: c_name}
        );

       // console.log(post);

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

module.exports.updateCateSome = async (req, res, next) => {

    try {
        console.log(req.body);
        const { c_id } = req.params;
        const { c_name } = req.body;

        console.log(`c_id : ${c_id}`);
        const post = await category.findByIdAndUpdate(c_id, {
            c_name: c_name
        });

        console.log(`post : ${post}`);

        if (!post) {
            throw new Error('Notthing to update');
        } else {
            res.status(201).json({ data: { post } });
        }

    } catch (err) {
        res.status(500).json({
            errors: {
                code: 500,
                message: err.message
            }
        });
    }
}

module.exports.deleteCate = async (req, res, next) => {
    try {
        const {c_id} = req.params;
        const post = await category.findByIdAndDelete(c_id);

        if (!post) {
            res.status(404).json({ errors: { message : "ไม่สามารถลบได้" } });
        }

        res.status(200).json({
            success : true,
        });
    } catch (err) {
        res.status(500).json({
            errors: {
                code: 500,
                message: "Cannot delete"
            }
        })
    } 
}*/

