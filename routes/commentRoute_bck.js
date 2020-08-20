const express = require('express')
const router = express.Router()
const commentController = require('../controllers/commentController');
const authentication = require('../middleware/authenticationHandler');

// router.get('/' , authentication.isLoggedIn , postController.index) ; 
// router.get('/:id' , authentication.isLoggedIn , postController.getPostById) ; 
router.post('/' , authentication.isLoggedIn, commentController.createComment) ; 
//router.put('/:id' , authentication.isLoggedIn , postController.updatePost)
//router.delete('/:id' , authentication.isLoggedIn , postController.deletePost ) ;

module.exports = router


