require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Fart = require('../lib/models/Fart');

describe('fart routes tests', () => {
    beforeAll(() => {
        connect();
    });

    beforeEach(() => {
        return mongoose.connection.dropDatabase();
    });

    afterAll(() => {
        return mongoose.connection.close();
    });

    it('can create a new fart', () => {
        return request(app)
            .post('/api/v1/farts')
            .send({ 
                type: 'silent',
                description: 'makes no sound',
                deadly: true, })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    type: 'silent',
                    description: 'makes no sound',
                    deadly: true,
                    __v: 0
                });
            });
    });

    it('can get all farts', async() => {
        const fart = await Fart.create({ 
            type: 'silent',
            description: 'makes no sound',
            deadly: true, 
        });
        
        return request(app)
            .get('/api/v1/farts')
            .then(res => {
                const fartJSON = JSON.parse(JSON.stringify(fart));
                expect(res.body).toEqual([fartJSON]);
            });
    });

    it('can get a fart by id', async() => {
        const fart = await Fart.create({ 
            type: 'silent',
            description: 'makes no sound',
            deadly: true, 
        });

        return request(app)
            .get(`/api/v1/farts/${fart._id}`)
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    type: 'silent',
                    description: 'makes no sound',
                    deadly: true,
                    __v: 0
                });
            });
    });

    it('can update an entire fart', async() => {
        const fart = await Fart.create({ 
            type: 'silent',
            description: 'makes no sound',
            deadly: true, 
        });

        return request(app)
            .put(`/api/v1/farts/${fart._id}`)
            .send({
                type: 'shart',
                description: 'a fart that leaves a streak in your undies',
                deadly: false,
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    type: 'shart',
                    description: 'a fart that leaves a streak in your undies',
                    deadly: false,
                    __v: 0
                });
            });
    });

    it('can update the deadly property of a fart', async() => {
        const fart = await Fart.create({ 
            type: 'silent',
            description: 'makes no sound',
            deadly: true, 
        });

        return request(app)
            .put(`/api/v1/farts/${fart._id}`)
            .send({ deadly: false })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    type: 'silent',
                    description: 'makes no sound',
                    deadly: false,
                    __v: 0
                });
            });
    });

    it('can delete a fart by id', async() => {
        const fart = await Fart.create({ 
            type: 'silent',
            description: 'makes no sound',
            deadly: true, 
        });

        return request(app)
            .delete(`/api/v1/farts/${fart._id}`)
            .then(res => {
                expect(res.body.type).toEqual('silent');
            });
    });
});
