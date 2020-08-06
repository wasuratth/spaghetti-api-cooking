const mongoose = require('mongoose');
const groupM = require('../models/groupModel');

module.exports.index = async function (req, res, next) {
    // select * from post; 
   
    try {
        
        const posts = await groupM.find();
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
    const { c_id } = req.params;
    console.log(`c_id : ${c_id}`);
    const post = await groupM.findOne({ _c_id: c_id });
    res.status(200).json({ data: { post } });
}

module.exports.createCate = async (req, res) => {
    console.log(req.body);
    const { c_id ,c_name} = req.body;
    console.log(`c_id : ${c_id}`);
    console.log(`c_name : ${c_name}`);
    let categ = new groupM({
        c_id: c_id,
        c_name : c_name
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

module.exports.createPost = async (req, res) => {
    //const { _id : c_id,m_id : m_id } = req.user ; 
    const { c_id: c_id,
        c_name : c_name} = req.body ;
     let group = new groupM({
        c_id: c_id,
        c_name : c_name
    
    });

    try {
        await group.save();
        res.status(201).json({ data: group , success: true , msg : '' });
    } catch (err) {
        res.status(500).json({  errors: { err } });
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

