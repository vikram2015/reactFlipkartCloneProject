let Promise = require('promise');
let jwt = require('jsonWebToken');
let config = require('../config/config');

exports.requireSignIn = (req, res, next) => {
    if(req.headers.authorization){
        const token = req.headers.authorization.split(' ')[1];
        console.log('---- token ======== ' + token);
        const user = jwt.verify(token, config.secretKey);
        req.user = user;
    } else {
        res.status(500).json({
            MSG: 'Authorization is required'
        })
    }
    next();
}

exports.userMiddleware = (req, res, next) => {
    if( req.user.role !== 'user' ){
        return res.status(400).json({MSG:'User acess denied'})
    }
    next();
};

exports.adminMiddleware = (req, res, next) => {
        if( req.user.role !== 'admin' ){
            return res.status(400).json({MSG:'Acess Denied'})
        }
        next();
};