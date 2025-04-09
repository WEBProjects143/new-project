// Task 2 model
const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    },
    orientation: {
        type: String,
        enum: ['portrait', 'landscape'],
        required: true
    },
    position: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Image', imageSchema);