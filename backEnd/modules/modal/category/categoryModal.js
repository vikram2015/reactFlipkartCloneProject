let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let CategorySchema = Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    parentId: {
        type: String
    }

},{ timestamps: true});

let Category = module.exports = mongoose.model('category', CategorySchema);