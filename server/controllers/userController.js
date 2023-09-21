const User = require('../models/user');


exports.signup = async (req, res, next) => {
    try{
        const addUser = await new User(req.body).save();
        res.status(201).end();
    } catch (e){
        if(e.code === 11000){
            res.status(404).json({error: 'Username is not unique'});
        } else {
            res.status(404).json({error: e.message});
        }
    }
    
}