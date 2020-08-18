const mongoose = require('mongoose');
const groupMap = require('../models/groupMapModel');

module.exports.index = async function (req, res, next) {
    // select * from post; 

    try {

        const posts = await groupMap.find();
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
    const post = await groupMap.findOne({ _c_id: c_id });
    res.status(200).json({ data: { post } });
}

module.exports.createCate = async (req, res) => {
    console.log(req.body);
    const { m_id, c_id } = req.body;
    let categ = new groupMap({
        m_id: m_id,
        c_id: c_id
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
    const { c_id: c_id, m_id: m_id } = req.body;
    let post = new groupMap({
        c_id: c_id,
        m_id: m_id,

    });

    try {
        await post.save();
        res.status(201).json({ data: post, success: true, msg: '' });
    } catch (err) {
        res.status(500).json({ errors: { err } });
    }
}


module.exports.deletePost = async (req, res) => {
    try {
        //const { m_id } = req.params;
        const { c_id: c_id, m_id: m_id } = req.body;
        const post = await Post.findByIdAndDelete(m_id);
        if (!post) {
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

module.exports.getMenuByMapRef = async (req, res, next) => {

    const { c_id } = req.params;
    // const group = await groupMap.findOne({ c_id: c_id }); 
    let groups = new Map() ; 
    groups.set('c1' , 'เมนูง่ายๆ') ; 
    groups.set('c2' , 'เมนูเส้น') ; 
    groups.set('c3' , 'เมนูเนื้อสัตว์') ; 
    groups.set('c4' , 'เมนูจานเดียว') ; 
    groups.set('c5' , 'เมนูเพื่อสุขภาพ') ; 
    groups.set('c6' , 'เมนูสลัด') ; 
    groups.set('c7' , 'เมนูผลไม้') ; 
    groups.set('c8' , 'เมนูของหวาน') ; 
    groups.set('c9' , 'เมนูเครื่องดื่ม') ; 

 

    const groupmaps = await groupMap.find({ c_id: c_id }).populate('m_id').exec(); 
    res.status(200).json({ success: true, msg: "" , data: groupmaps , title  : groups.get(c_id) });
}