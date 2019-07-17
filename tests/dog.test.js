require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Dog = require('../lib/models/Dog');

describe('dog routes tests', () => {
    beforeAll(() => {
        connect();
    });

    beforeEach(() => {
        return mongoose.connection.dropDatabase();
    });

    afterAll(() => {
        return mongoose.connection.close();
    });

    it('can create a new dog', () => {
        return request(app)
            .post('/api/v1/dogs')
            .send({
                name: 'Pennie',
                age: 7,
                weight: '12 lbs'
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    name: 'Pennie',
                    age: 7,
                    weight: '12 lbs',
                    __v: 0
                });
            });
    });

    it('can return all dogs', async() => {
        const dog = await Dog.create({
            name: 'Pennie',
            age: 7,
            weight: '12 lbs'
        });

        return request(app)
            .get('/api/v1/dogs')
            .then(res => {
                const dogJSON = JSON.parse(JSON.stringify(dog));
                expect(res.body).toEqual([dogJSON]);
            });
    });
});
