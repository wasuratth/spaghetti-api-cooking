const express = require('express')
const router = express.Router()
const menuController   = require('../controllers/menuController')
const authentication = require('../middleware/authenticationHandler');

//GET localhost:3000/api/post
router.get('/', menuController.index)
router.get('/:id', menuController.getMenuById)
router.post('/' , authentication.isLoggedIn , menuController.saveMenu) ; 


/* //GET localhost:3000/api/post/xxxxxxxxxxx
router.get('/:id', categoryController.getCateById)
//router.get('/tag/:id', categoryController.getTags)
//router.get('/comment/:id', categoryController.getComments)
//POST localhost:3000/api/post  {BODY}
router.post('/', categoryController.createCate)
//PUT localhost:3000/api/post/xxxxxxxxxxxx {BODY}
router.put('/:id', categoryController.updateCate)
//PATCH localhost:3000/api/post/xxxxxxxxxxxx {BODY}
router.patch('/:id', categoryController.updateCateSome)
// DELETED localhost:3000/api/post/xxxxxxxxxxxx
router.delete('/:id', categoryController.deleteCate) */

module.exports = router
