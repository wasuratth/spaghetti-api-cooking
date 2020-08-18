
const Picture = require('../models/pictureModel');
const multer = require('multer')
const fs = require('fs')

module.exports.uploadImage = async (req, res, next) => {

    const { _id: user_id } = req.user;
    console.log(req.file);
    // const img = fs.readFileSync(req.file.path);
    const encodeImage = req.file.buffer.toString('base64');
    // Define a JSONobject for the image attributes for saving to database

    const finalImg = { user: user_id, contenttype: req.file.mimetype, image: new Buffer(encodeImage, 'base64') };
    let picture = new Picture(finalImg);

    await picture.save();
    res.status(200).json({ success: true, data: { _id: picture._id }, msg: "ได้ทำการอัพโหลดภาพแล้ว" });


}

module.exports.getPictureById = async (req, res, next) => {
    var { id } = req.params ;

    const pic = await Picture.findById(id) ; 
    res.status(200) ; 
    res.contentType('image/jpeg');
    res.send(pic.image)

     
} 

