
const User = require('../models/userModel');
const Picture = require('../models/pictureModel');
const ObjectId = require('mongoose').Types.ObjectId;


module.exports.getMyProfile = async (req, res, next) => {
    const { _id: user_id } = req.user;
    const user = await User.findById(user_id).select(['name', 'username', 'picture', 'createAt', 'updateAt', 'isDetele']);
    res.status(200).json({ data: user, success: true, msg: '' });
}

module.exports.changeMyPassword = async (req, res, next) => {
    const { _id: user_id } = req.user;
    const { oldpassword, newpassword } = req.body;

    try {
        const user = await User.findById(user_id);

        const isMatch = await user.comparePassword(oldpassword);

        if (!isMatch) {
            const error = new Error('รหัสผ่านเดิมไม่ถูกค้อง');
            error.statusCode = 401;
            throw error;
        }

        user.password = await user.encryptPassword(newpassword);
        user.save();

        res.status(200).json({ success: true, data: {}, msg: "ได้ทำการเปลี่ยนรหัสผ่านแล้ว" });
    } catch (err) {
        next(err);
    }

}

module.exports.uploadProfilePicture = async (req, res, next) => {

    const { _id: user_id } = req.user;
    const encodeImage = req.file.buffer.toString('base64');

    const finalImg = { user: user_id, contenttype: req.file.mimetype, image: new Buffer(encodeImage, 'base64') };
    let picture = new Picture(finalImg);

    
    await picture.save();
    
    const user = await User.findById(user_id);
    user.picture = picture._id ; 
    await user.save(); 
    
    res.status(200).json({ success: true, data: { _id: picture._id }, msg: "ได้ทำการอัพโหลดภาพแล้ว" });


}