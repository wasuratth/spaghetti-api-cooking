const express = require('express')
const router = express.Router()
const groupMapController   = require('../controllers/groupMapController')
const authentication = require('../middleware/authenticationHandler');

//GET localhost:3000/api/post
router.get('/', groupMapController.index) ; 
router.get('/type/:c_id', authentication.isLoggedIn , groupMapController.getMenuByMapRef ) ; 
router.post('/' , groupMapController.createPost) ; 
router.delete('/', groupMapController.deletePost) ; 

module.exports = router
