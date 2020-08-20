
const Knowledge = require('../models/knowledgeModel');

module.exports.index = async (req, res, next) => {
    try {
        const knowledges = await Knowledge.find();
        res.status(200).json({
            success: true,
            msg: "",
            data: knowledges
        });
    } catch (err) {
        next(err);
    }
}

module.exports.getKnowledgeById = async (req, res, next) => {
    const { id } = req.params;
    const knowledge = await Knowledge.findById(id);
    await Knowledge.updateOne({ _id: id }, { viewcount: ++knowledge.viewcount });
    res.status(200).json({
        success: true,
        msg: "",
        data: knowledge
    });
}


module.exports.getKnowledgeByTitle = async (req, res, next) => {
    const { search } = req.params;
    const knowledges = await Knowledge.find({ "title": { "$regex": search, "$options": "i" } });
    res.status(200).json({
        success: true,
        msg: "",
        data: knowledges
    });
}
