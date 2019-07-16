const mongoose = require('mongoose');

const memeSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    top: {
        type: String
    },
    bottom: {
        type: String
    }
});

const Meme = mongoose.model('Meme', memeSchema);

module.exports = Meme;
