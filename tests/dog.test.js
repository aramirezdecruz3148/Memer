require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Person = require('../lib/models/Person');
const Dog = require('../lib/models/Dog');

describe('dog routes tests', () => {
    beforeAll(() => {
        connect();
    });

    beforeEach(() => {
        return mongoose.connection.dropDatabase();
    });

    let owner = null;
    beforeEach(async() => {
        owner = JSON.parse(JSON.stringify(await Person.create({ name: 'ryan', email: 'ryan@ryan.com' })));
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
                weight: '12 lbs',
                owner: owner._id
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    name: 'Pennie',
                    age: 7,
                    weight: '12 lbs',
                    owner: expect.any(String),
                    __v: 0
                });
            });
    });

    it('can return all dogs', async() => {
        const dog = await Dog.create([{
            name: 'Pennie',
            age: 7,
            weight: '12 lbs',
            owner: owner._id
        }],
        {
            name: 'Charolette',
            age: 10,
            weight: '40 lbs',
            owner: owner._id
        }
        );

        return request(app)
            .get('/api/v1/dogs')
            .then(res => {
                const dogsJSON = JSON.parse(JSON.stringify(dog));
                dogsJSON.forEach(dog => {
                    expect(res.body).toContainEqual(dog);
                });
            });
    });

    it('can return a dog with their owner by id', async() => {
        const dog = await Dog.create({
            name: 'Charolette',
            age: 10,
            weight: '40 lbs',
            owner: owner._id
        });

        return request(app)
            .get(`/api/v1/dogs/${dog._id}`)
            .then(res => {
                const dogJSON = JSON.parse(JSON.stringify(dog));
                expect(res.body).toEqual({
                    ...dogJSON,
                    owner
                });
            });
    });

    it('can update a dog by id', async() => {
        const dog = await Dog.create({
            name: 'Charolette',
            age: 10,
            weight: '40 lbs',
            owner: owner._id
        });

        return request(app)
            .put(`/api/v1/dogs/${dog._id}`)
            .send({
                name: 'Pennie',
                age: 7,
                weight: '12 lbs',
                owner: owner._id
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    name: 'Pennie',
                    age: 7,
                    weight: '12 lbs',
                    owner: owner._id,
                    __v: 0
                });
            });
    });
});
