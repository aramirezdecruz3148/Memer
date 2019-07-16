require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Meme = require('../lib/models/Meme');

describe('meme route tests', () => {
    beforeAll(() => {
        connect();
    });

    beforeEach(() => {
        return mongoose.connection.dropDatabase();
    });

    afterAll(() => {
        return mongoose.connection.close();
    });

    it('can create a new meme', () => {
        return request(app)
            .post('/api/v1/memes')
            .send({ image: 'an image url', topText: 'witty text', bottomText: 'even wittier!' })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    image: 'an image url',
                    topText: 'witty text',
                    bottomText: 'even wittier!',
                    __v: 0
                });
            });
    });

    it('can get all memes', async() => {
        const meme = await Meme.create({ 
            image: 'an image url', 
            topText: 'witty text', 
            bottomText: 'even wittier!' 
        });
        
        return request(app)
            .get('/api/v1/memes')
            .then(res => {
                const memeJSON = JSON.parse(JSON.stringify(meme));
                expect(res.body).toEqual([memeJSON]);
            });
    });
});
