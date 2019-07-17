const { Router } = require('express');
const Person = require('../models/Person');
const Dog = require('../models/Dog');

module.exports = Router()
    .post('/', (req, res, next) => {
        const {
            name,
            city, 
            state, 
            profileImage, 
            email
        } = req.body;

        Person
            .create({ name, city, state, profileImage, email, })
            .then(person => res.send(person))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Person  
            .find()
            .then(people => res.send(people))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Person
            .findById(req.params.id)
            .then(meme => res.send(meme))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Person
            .findByIdAndDelete(req.params.id)
            .then(person => res.send(person))
            .catch(next);
    });
