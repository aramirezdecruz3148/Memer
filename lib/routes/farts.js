const { Router } = require('express');
const Fart = require('../models/Fart');

module.exports = Router()
    .post('/', (req, res, next) => {
        const {
            type, 
            description, 
            deadly
        } = req.body;

        Fart
            .create({ type, description, deadly })
            .then(fart => res.send(fart))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Fart
            .find()
            .then(farts => res.send(farts))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Fart
            .findById(req.params.id)
            .then(fart => res.send(fart))
            .catch(next);
    })

    .put('/:id', (req, res, next) => {
        Fart    
            .findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(updatedFart => res.send(updatedFart))
            .catch(next);
    })

    .patch('/:id', (req, res, next) => {
        const { 
            deadly
        } = req.body;

        Fart 
            .findByIdAndUpdate(req.params.id, { deadly }, { new: true })
            .send(patchedFart => res.send(patchedFart))
            .catch(next);
    })

    .delete('/:id', (req, res, next) => {
        Fart
            .findByIdAndDelete(req.params.id)
            .then(fart => res.send(fart))
            .catch(next);
    });
