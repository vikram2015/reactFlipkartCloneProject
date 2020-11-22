let Promise = require('promise');
let jwt = require('jsonWebToken');
const {validationResult} = require('express-validator');
let config = require('../../../config/config');
const UserModal = require('../../modal/user/userModal');

let userSignUp = (data) => {
    return new Promise((resolve, reject) => {

        UserModal.findOne({email : data.email})
            .exec((err, user) => {
                if(user) {
                    resolve('User already exist');
                }
                const {
                    firstName,
                    lastName,
                    email,
                    password
                } = data;
                const _user = new UserModal({
                    firstName,
                    lastName,
                    email,
                    password,
                    userName : Math.random().toString()
                });
                _user.save().then((data) => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                })
            });
    })
}

let userSignIn = (userDetails) => {
    return new Promise((resolve, reject) => {
        UserModal.findOne({email : userDetails.email})
            .exec()
            .then((user) => {
                if(user){
                    if(user.authenticate(userDetails.password)){
                        const token = jwt.sign({_id: user._id}, config.secretKey, {expiresIn:'1h'});
                        resolve({token, user});
                    }else {
                        resolve('Invalid password');
                    }
                } else {
                    resolve('User Not Found');
                }
            }).catch(err => {
                reject(err);
            });
    });
};

let verifyUser = (data) => {
    return new Promise(( resolve, reject) => {
        const token = data.authorization.split(' ')[1];
        console.log('token ======== ' + token);
        const user = jwt.verify(token, config.secretKey);
        resolve(true);
    })
}
module.exports = {
    userSignUp: userSignUp,
    userSignIn: userSignIn,
    verifyUser: verifyUser
}