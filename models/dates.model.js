const mongoose = require('mongoose');
const Float = require('mongoose-float').loadType(mongoose);

const Schema = mongoose.Schema;

const datesSchema = new Schema({
    username: {
        type: String,
        requried: true,
        trim: true,
        minlength: 5
    },
    id: {
        type: String,
        required: true,
    },
    bool: {
        type: String,
        required: true,
    },
    date:
    {
        type: String,
        required: true,
    }
},{
    timestamps: true,
})

const Dates = mongoose.model('Dates', datesSchema);

module.exports = Dates;