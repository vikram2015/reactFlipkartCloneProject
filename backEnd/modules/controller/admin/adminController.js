let Promise = require('promise');
let jwt = require('jsonWebToken');
let config = require('../../../config/config');
const AdminModal = require('../../modal/user/userModal');


let AdminSignUp = (data) => {
    return new Promise((resolve, reject) => {
        AdminModal.findOne({email : data.email})
            .exec((err, admin) => {
                if(admin) {
                    resolve('Admin already exist');
                }
                const {
                    firstName,
                    lastName,
                    email,
                    password
                } = data;
                const _admin = new AdminModal({
                    firstName,
                    lastName,
                    email,
                    password,
                    userName : 'ajayKumar',
                    role: 'admin'
                });
                _admin.save().then((data) => {
                    resolve(data);
                }).catch(err => {
                    reject(err);
                })
            });
    })
}

let AdminSignIn = (AdminDetails) => {
    return new Promise((resolve, reject) => {
        AdminModal.findOne({email : AdminDetails.email})
            .exec()
            .then((admin) => {
                if(admin){
                    if(admin.authenticate(AdminDetails.password) && admin.role === 'admin'){
                        const token = jwt.sign({_id: admin._id}, config.secretKey, {expiresIn:'1h'});
                        resolve({token, admin});
                    }else {
                        resolve('Invalid password');
                    }
                } else {
                    resolve('Admin Not Found');
                }
            }).catch(err => {
                reject(err);
            });
    });
};

let verifyUser = (data) => {
    return new Promise(( resolve, reject) => {
        const token = data.authorization.split(' ')[1];
        const user = jwt.verify(token, config.secretKey);
        resolve(true);
    })
}
module.exports = {
    AdminSignUp: AdminSignUp,
    AdminSignIn: AdminSignIn,
    verifyUser: verifyUser
}