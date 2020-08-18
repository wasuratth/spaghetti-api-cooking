const express = require('express')
const router = express.Router()
const groupController   = require('../controllers/groupController')

//GET localhost:3000/api/post
router.get('/', groupController.index)
router.post('/' , groupController.createPost) ; 

module.exports = router
