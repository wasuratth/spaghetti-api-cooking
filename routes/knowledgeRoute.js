const express = require('express')
const router = express.Router() ; 

const authentication = require('../middleware/authenticationHandler');
const knowledgeController = require('../controllers/knowledgeController');


router.get('/' , knowledgeController.index ) ;  
router.get('/:id' , knowledgeController.getKnowledgeById ) ;  

 
 
module.exports = router


