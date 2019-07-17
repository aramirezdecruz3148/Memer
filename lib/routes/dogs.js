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
    });
