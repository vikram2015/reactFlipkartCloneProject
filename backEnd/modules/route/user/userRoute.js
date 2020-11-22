const verifyRequest = require('../../../config/verify')
const express = require('express');
const router = express.Router();
const {check, validationResult} = require('express-validator');
const UserController = require('../../controller/user/userController');
const CommonMiddleware = require('../../../config/commonMiddleware');

router.post('/signIn', verifyRequest.verifySignInRequest, verifyRequest.isRequestValidated, (req, res, next) => {
    UserController.userSignIn(req.body).then((data) => {
        if(data == 'User Not Found'){
            res.status(400).json({
                Message: 'User Not Found'
            })
        } else {
            if(data == 'Invalid password'){
                res.status(400).json({
                    Message: 'Invalid password'
                })
            } else {
                const { _id, firstName, lastName, email, role, fullName} = data.user;
                res.status(200).json({
                    token: data.token,
                    user: {
                        firstName, lastName, email, role, fullName, _id
                    }
                })
            }
        }
    })

    });

router.post('/signUp', verifyRequest.verifySignUpRequest, verifyRequest.isRequestValidated,( req, res, next ) => {

    // let errors = [];
    let errors = (validationResult(req));
    errors = errors.array();
     if( errors.length > 0 ) {
         return res.status(400).json({errors: errors})
     }

    UserController.userSignUp(req.body).then((data) => {
        if(data === 'User already exist'){
            res.status(400).json({
                message : 'User already exist'
            })
        } else {
            res.status(201).json({
                user: data
            })
        }
    })

})

router.post('/profile', CommonMiddleware.requireSignIn, (req, res) => {
        res.status(200).json({user: 'Inside profile'});
})

module.exports = router;