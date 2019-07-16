const mongoose = require('mongoose');

const memeSchema = new mongoose.Schema({
    image: {
        type: String,
        required: true
    },
    topText: {
        type: String
    },
    bottomText: {
        type: String
    }
});

const Meme = mongoose.model('Meme', memeSchema);

module.exports = Meme;
