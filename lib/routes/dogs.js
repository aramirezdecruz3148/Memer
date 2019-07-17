const { Router } = require('express');
const Dog = require('../models/Dog');

module.exports = Router()
    .post('/', (req, res, next) => {
        const {
            name, 
            age, 
            weight, 
            owner
        } = req.body;

        Dog 
            .create({ name, age, weight, owner })
            .then(dog => res.send(dog))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Dog 
            .find()
            .then(dogs => res.send(dogs))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Dog 
            .findById(req.params.id)
            .populate('owner')
            .then(dogAndOwner => res.send(dogAndOwner))
            .catch(next);
    })

    .put('/:id', (req, res, next) => {
        Dog
            .findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(updatedDog => res.send(updatedDog))
            .catch(next);
    });
