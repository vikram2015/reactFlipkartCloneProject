const {check, validationResult} = require('express-validator');
exports.verifySignUpRequest = [
        check('firstName')
            .notEmpty()
            .withMessage('First Name is Required'),
        check('lastName')
            .notEmpty()
            .withMessage('Last Name is Required'),
        check('email')
            .notEmpty()
            .withMessage('Email is Required')
            .isEmail()
            .withMessage('Valid Email is Required'),
        check('password')
            .isLength({min: 6})
            .withMessage('Password must be of minimum 6 characters')
        ]

exports.verifySignInRequest = [
    check('email')
        .notEmpty()
        .isEmail()
        .withMessage('Valid Email is Required'),
    check('password')
        .isLength({min: 6})
        .withMessage('Password must be of minimum 6 characters')
]

exports.isRequestValidated = (req, res, next) => {
    const errors = validationResult(req);
    if(errors.array().length > 0) {
        return res.status(400).json({errors: errors.array()[0].msg})
    }
    next();
}