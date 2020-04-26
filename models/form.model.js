const mongoose = require('mongoose');
const Float = require('mongoose-float').loadType(mongoose);

const Schema = mongoose.Schema;

const formSchema = new Schema({
    index: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
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
        required: true,
    }
     
}, {
    timestamps: true,
})

const Form = mongoose.model('Form', formSchema);

module.exports = Form