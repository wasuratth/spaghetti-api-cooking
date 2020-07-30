const express = require('express')
const router = express.Router()
const authController= require('../controllers/authController');
// const isLoggedIn = require('../middleware/checkLogin');

router.post('/signin', authController.signin ) ; 
router.post('/signup', authController.signup ) ; 
 
module.exports = router


