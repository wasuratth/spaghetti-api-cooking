const express = require('express')
const router = express.Router()
const menuController   = require('../controllers/menuController')
const authentication = require('../middleware/authenticationHandler');

//GET localhost:3000/api/post

router.get('/search/:search', menuController.getMenuByName)
router.get('/user', authentication.isLoggedIn ,  menuController.getMenuByUser)


router.get('/', menuController.index)
router.get('/:id', menuController.getMenuById);
router.post('/' , authentication.isLoggedIn , menuController.saveMenu) ; 
router.delete('/:id' , authentication.isLoggedIn , menuController.deleteMenu) ; 


module.exports = router
