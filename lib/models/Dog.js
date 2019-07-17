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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Person',
        required: true 
    }
});

const Dog = mongoose.model('Dog', dogSchema);

module.exports = Dog;
