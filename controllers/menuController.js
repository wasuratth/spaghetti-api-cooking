const Menu = require('../models/menuModel');
const GroupMapModel = require('../models/groupMapModel');

module.exports.index = async (req, res, next) => {
    try {
        const menus = await Menu.find();
        res.status(200).json({
            success: true,
            msg: "",
            data: menus
        });
    } catch (err) {
        next(err);
    }
}

module.exports.getMenuById = async (req, res, next) => {

    const { id } = req.params;
    const menu = await Menu.findById(id);
    await Menu.updateOne({ _id: id }, { viewcount: ++menu.viewcount });
    res.status(200).json({
        success: true,
        message: "",
        data: menu
    });
}

module.exports.getMenuByName = async (req, res, next) => {
    const { search } = req.params;
    const menus = await Menu.find({ "title": { "$regex": search, "$options": "i" } });
    res.status(200).json({
        success: true,
        message: "",
        data: menus
    });
}

module.exports.getMenuByUser = async (req, res, next) => {

    const { _id: user_id } = req.user;
    console.log(req.user);
    const menus = await Menu.find({ "user": user_id }).sort({ "createdAt" : -1 }).exec();
    res.status(200).json({
        success: true,
        message: "",
        data: menus
    });
}




module.exports.saveMenu = async (req, res, next) => {
    const { _id: user_id } = req.user;
    const { id, title, detail, picture, step, ingredients, group } = req.body;

    try {

        if (!id) {
            let menu = new Menu({
                title: title,
                user: user_id,
                detail: detail,
                picture: picture,
                group: group,
                step: step,
                ingredients: ingredients
            });

            await menu.save();

            if (menu._id) {
                let groupmap = GroupMapModel({
                    c_id: group,
                    m_id: menu._id
                });
                await groupmap.save();
            }
            res.status(201).json({ data: menu, success: true, message: "" });
        } else {

            let menu = await Menu.findByIdAndUpdate({ _id: id }, {
                user: user_id,
                title: title,
                detail: detail,
                picture: picture,
                step: step,
                group: group,
                ingredients: ingredients
            });

            if (menu.nModified === 0) {
                throw new Error('Cannot update');
            } else {

                await GroupMapModel.deleteMany({ m_id: menu._id }).exec();

                let groupmap = GroupMapModel({
                    c_id: group,
                    m_id: menu._id
                });

                await groupmap.save();
                res.status(201).json({ data: menu, success: true, message: "" });
            }
        }
    } catch (err) {
        next(err);
    }
}

module.exports.deleteMenu = async function (req, res, next) {
    try {
        const { id } = req.params;
        const menu = await Menu.findByIdAndDelete(id);
        if (!menu) {
            res.status(404).json({
                success: fasle, errors: { message: "Cannot delete" }
            });
        }
        await GroupMapModel.deleteMany({m_id : id }).exec()  ;
        res.status(200).json({ message: 'Deleted have been completed', success: true, });
        
    } catch (err) {
        res.status(500).json({
            errors: {
                success: fasle, message: "Cannot delete",
            }
        })
    }
}

