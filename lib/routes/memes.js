const { Router } = require('express');
const Meme = require('../models/Meme');

module.exports = Router()
    .post('/', (req, res, next) => {
        const {
            image, 
            topText, 
            bottomText
        } = req.body;

        Meme
            .create({ image, topText, bottomText })
            .then(meme => res.send(meme))
            .catch(next);
    })

    .get('/', (req, res, next) => {
        Meme
            .find()
            .then(memes => res.send(memes))
            .catch(next);
    })

    .get('/:id', (req, res, next) => {
        Meme
            .findById(req.params.id)
            .then(meme => res.send(meme))
            .catch(next);
    })

    .put('/:id', (req, res, next) => {
        Meme    
            .findByIdAndUpdate(req.params.id, req.body, { new: true })
            .then(updatedMeme => res.send(updatedMeme))
            .catch(next);

            
    });
