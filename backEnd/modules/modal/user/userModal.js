let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let Schema = mongoose.Schema;
let UserSchema = Schema({

    firstName : {
        type : String,
        required : true,
        trim : true,
        min : 3,
        max : 30
    },
    lastName : {
        type: String,
        required: true,
        trim: true,
        min: 3,
        max: 30
    },
    userName : {
        type: String,
        required: true,
        trim: true,
        unique: true,
        index: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    hash_password : {
        type: String,
        required: true
    },
    role : {
        type:String,
        enum : ['user', 'admin'],
        default: 'user'
    },
    contact : {
        type: Number
    },
    profile_pic : {
        type: String
    },

}, {timestamps: true});

UserSchema.virtual('password')
    .set(function (password) {
        this.hash_password = bcrypt.hashSync(password, 10);
    });

UserSchema.virtual('fullName')
    .get(function () {
        return `${this.firstName} ${this.lastName}`;
    })

UserSchema.methods = {
    authenticate: function (password) {

        return bcrypt.compareSync(password, this.hash_password);

    }
}

let Users = module.exports = mongoose.model('user', UserSchema);