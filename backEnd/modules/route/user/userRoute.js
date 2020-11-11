const express = require('express');
const router = express.Router();
const {verifyRequest, isRequestValidated} = require('../../../config/verify');
const {check, validationResult} = require('express-validator');
const UserController = require('../../controller/user/userController');

router.post('/signIn', (req, res, next) => {
    console.log('-------- req.body --------- >>>> ' + JSON.stringify(req.body))
    UserController.userSignIn(req.body).then((data) => {
        if(data == 'User Not Found'){
            console.log('-------- 00000000 ')
            res.status(400).json({
                Message: 'User Not Found'
            })
        } else {
            console.log('-------- 11111111 ')
            if(data == 'Invalid password'){
                res.status(400).json({
                    Message: 'Invalid password'
                })
            } else {
                console.log('-------- 22222222 ')
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

router.post('/signUp', verifyRequest, isRequestValidated,( req, res, next ) => {

    // let errors = [];
    let errors = (validationResult(req));
    errors =errors.array();
     if( errors.length > 0 ) {
         console.log('========= errors.length ====== ' + errors.length);
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

router.post('/profile', (req, res) => {
    UserController.verifyUser(req.headers).then((result) => {
        res.status(200).json({user: 'profile'});
    })
})

module.exports = router;