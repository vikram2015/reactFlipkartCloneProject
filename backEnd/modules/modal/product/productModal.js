let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ProductSchema = Schema({
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
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    offer: {
        type: Number
    },
    productPicture: [
        {
            img: {
                type: String
            }
        }
    ],
    reviews: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectID,
                ref: 'user'
            },
            review: String
        }
    ],
    category: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'category'
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'user'
    },
    updatedAt: {
        type: Date
    }

},{ timestamps: true});

let Product = module.exports = mongoose.model('product', ProductSchema);