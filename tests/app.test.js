require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
// const Meme = require('../lib/models/Meme');

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
            .send({ image: 'an image url' })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    topText: 'witty text',
                    bottomText: 'even wittier!',
                    __v: 0
                });
            });
    });
});
