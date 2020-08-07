const Menu = require('../models/menuModel');
const GroupMapModel = require('../models/groupMapModel');

module.exports.index = async (req, res, next) => {
    try {
        const menus = await Menu.find();
        res.status(200).json({
            success: true,
            msg : "" , 
            data: menus
        });
    } catch (err) {
        next(err);
    }
}

module.exports.getMenuById = async  (req, res, next) => {
    const {id} = req.params ; 
    const menu = await Menu.findById(id);
    await Menu.updateOne({ _id : id },  { viewcount : ++ menu.viewcount  } );
    res.status(200).json({
        success: true,
        msg: "",
        data: menu
    });
}


module.exports.saveMenu = async  (req, res, next) => {
    const { _id : user_id } = req.user ;  
    const { id , title , detail , picture , step , ingredients , group } = req.body ;
    try {

        if(!id){
            let menu = new Menu({
                title : title , 
                user : user_id ,
                detail: detail , 
                picture: picture , 
                step: step , 
                ingredients: ingredients  
            });

            await menu.save();

            if(menu._id){
                let groupmap = GroupMapModel({
                    c_id : group , 
                    m_id : menu._id  
                });
                await groupmap.save();
            }
            res.status(201).json({ data: menu , success: true , message : "" });
        }else{

            let menu = await Menu.findByIdAndUpdate({_id , id} , {
                user : user_id ,
                title : title , 
                detail: detail , 
                picture: picture , 
                step: step , 
                ingredients: ingredients  
            }) ; 
            
            if (menu.nModified === 0) {
                throw new Error('Cannot update');
            }else{
                
                res.status(201).json({ data: menu , success: true , message : "" });
            }
        }
    } catch (err) {
        next(err) ; 
    }
}

