const mongoose = require('mongoose');

const dogSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    weight: {
        type: String
    },
    owner: {
        type: String
    }
});

const Dog = mongoose.model('Dog', dogSchema);

module.exports = Dog;
