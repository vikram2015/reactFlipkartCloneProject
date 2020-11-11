const express = require('express');
const router = express.Router();
const AdminController = require('../../controller/admin/adminController');

router.post('/signIn', (req, res, next) => {
    console.log('-------- req.body --------- >>>> ' + JSON.stringify(req.body))
    AdminController.AdminSignIn(req.body).then((data) => {
        if(data == 'Admin Not Found'){
            console.log('-------- 00000000 ')
            res.status(400).json({
                Message: 'Admin Not Found'
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
                    Admin: {
                        firstName, lastName, email, role, fullName, _id
                    }
                })
            }
        }
    })

    });

router.post('/signUp', ( req, res, next ) => {
    AdminController.AdminSignUp(req.body).then((data) => {

        if(data === 'Admin already exist'){
            res.status(400).json({
                message : 'Admin already exist'
            })
        } else {
            res.status(201).json({
                Admin: data
            })
        }
    })

})

router.post('/profile', (req, res) => {
    AdminController.verifyUser(req.headers).then((result) => {
        res.status(200).json({Admin: 'profile'});
    })
})

module.exports = router;