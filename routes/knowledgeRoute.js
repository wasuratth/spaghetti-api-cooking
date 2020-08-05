const express = require('express')
const router = express.Router() ; 

const authentication = require('../middleware/authenticationHandler');
const knowledgeController = require('../controllers/knowledgeController');


router.get('/' , authentication.isLoggedIn , knowledgeController.index ) ;  
router.get('/:id' , authentication.isLoggedIn , knowledgeController.getKnowledgeById ) ;  

 
 
module.exports = router


