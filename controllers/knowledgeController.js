
const Knowledge = require('../models/knowledgeModel');

module.exports.index = async (req, res, next) => {
    try {
        const knowledges = await Knowledge.find();
        res.status(200).json({
            success: true,
            data: knowledges
        });
    } catch (err) {
        next(err);
    }
}

module.exports.getKnowledgeById = async  (req, res, next) => {
    const {id} = req.params ; 
    console.log(id) ; 
    const knowledge = await Knowledge.findById(id);
    await Knowledge.updateOne({ _id : id },  { viewcount : ++ knowledge.viewcount  } );
     res.status(200).json(knowledge);
}
