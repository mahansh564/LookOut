const mongoose = require('mongoose');
const Float = require('mongoose-float').loadType(mongoose);

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        requried: true,
        trim: true,
        minlength: 5
    },
    phone: {
        type: String,
        required: true,
        unique: true,
        length: 10,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 5
    },
    lat: {
        type: Float,
        required: true
    },
    long: {
        type: Float,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    pincode: {
        type: String,
        required: true,
        minlength: 6,
    },
    district: {
        type: String,
        requried: true
    },
    date:
    {
        type: Date,
        default: Date.now,
        required: true,
    }
},{
    timestamps: true,
})

const User = mongoose.model('User', userSchema);

module.exports = User;