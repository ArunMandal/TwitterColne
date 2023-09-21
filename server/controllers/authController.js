const jwt = require('jsonwebtoken');

const User = require('../models/user');
const privateSecret = 'MSD-CS477';


exports.login = async (req, res, next) => {
    const user = await User.findOne(req.body);
    if(user) {
        const token = jwt.sign({username: user.username, role: user.role}, privateSecret);
        res.status(200).json({token:token,userId:user._id,username:user.username});
    } else {
        res.status(401).json({error: 'username or password is invalid'});
    }
}


exports.authorize = (req, res, next) => {
    // console.log(req.headers);
    const authorization = req.headers.authorization;
    if(authorization) {
        const token = authorization.split(' ')[1];
        jwt.verify(token, privateSecret, (err, user) => {
            if(err){
                res.status(403).json({error: 'Unauthorized'})
            } else {
                req.user = user; //{username: 'john', role: 'user'}
                next();
            }
        });
    } else {
        res.status(401).json({error: 'Please login'});
    }
}

exports.authorizeAdmin = (req, res, next) => {
    if(req.user.role === 'admin'){
        next();
    } else {
        res.status(403).json({error: 'Unauthorized'})
    }
}



