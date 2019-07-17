const mongoose = require('mongoose');

const fartSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    description: { type: String },

    deadly: {
        type: Boolean,
        required: true
    }
});

const Fart = mongoose.model('Fart', fartSchema);

module.exports = Fart;
