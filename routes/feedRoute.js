const express = require('express')
const router = express.Router() ; 

const authentication = require('../middleware/authenticationHandler');
const feedController = require('../controllers/feedController');


router.get('/' , authentication.isLoggedIn , feedController.index ) ;  
router.get('/:user_id' , authentication.isLoggedIn , feedController.getFeedByUserId ) ;  


// router.get('/:id', isLoggedIn ,  userController.getUserById) ; 

// router.post('/', userController.createUser) ; 
// router.put('/:id', userController.updateUser)
// router.delete('/:id', userController.deleteUser) ;
 
module.exports = router


