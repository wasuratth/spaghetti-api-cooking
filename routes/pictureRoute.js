const express = require('express')
const router = express.Router()
const fileController   = require('../controllers/fileController')
const authentication = require('../middleware/authenticationHandler');
const multer  = require('multer')
const upload = multer()


router.get('/:id' , [  ] , fileController.getPictureById ) ; 
router.post('/' , [  authentication.isLoggedIn , upload.single('picture')] , fileController.uploadImage) ; 

 

module.exports = router
