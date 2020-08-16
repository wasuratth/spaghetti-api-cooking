const express = require('express')
const router = express.Router()
const fileController   = require('../controllers/fileController')
const authentication = require('../middleware/authenticationHandler');
var multer  = require('multer')
var upload = multer()


router.get('/:id' , [  ] , fileController.getPictureById ) ; 
router.post('/' , [  authentication.isLoggedIn , upload.single('picture')] , fileController.uploadImage) ; 

 

module.exports = router
