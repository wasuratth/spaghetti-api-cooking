const express = require('express') ; 
const router = express.Router(); 

const authentication = require('../middleware/authenticationHandler');
const profileController = require('../controllers/profileController');
const multer  = require('multer')
const upload = multer()

router.get('/me' , authentication.isLoggedIn , profileController.getMyProfile) ;  
router.post('/password' , authentication.isLoggedIn , profileController.changeMyPassword) ;  
router.post('/picture' , [  authentication.isLoggedIn , upload.single('picture')] , profileController.uploadProfilePicture) ; 

  
module.exports = router


