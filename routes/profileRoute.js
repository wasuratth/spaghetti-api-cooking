const express = require('express') ; 
const router = express.Router(); 

const authentication = require('../middleware/authenticationHandler');
const profileController = require('../controllers/profileController');


router.get('/me' , authentication.isLoggedIn , profileController.getMyProfile) ;  
 
  
module.exports = router


