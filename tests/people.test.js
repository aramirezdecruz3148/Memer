require('dotenv').config();
const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Person = require('../lib/models/Person');

describe('people routes tests', () => {
    beforeAll(() => {
        connect();
    });

    beforeEach(() => {
        return mongoose.connection.dropDatabase();
    });

    afterAll(() => {
        return mongoose.connection.close();
    });

    it('can create a new person', () => {
        return request(app)
            .post('/api/v1/people')
            .send({
                name: 'Alex',
                city: 'Portland',  
                state: 'Oregon',
                email: 'aramirezdecruz@gmail.com'
            })
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    name: 'Alex',
                    city: 'Portland',  
                    state: 'Oregon',
                    email: 'aramirezdecruz@gmail.com',
                    __v: 0
                });
            });
    });

    it('can get all people', async() => {
        const person = await Person.create({
            name: 'Alex',
            city: 'Portland',  
            state: 'Oregon',
            email: 'aramirezdecruz@gmail.com'
        });

        return request(app)
            .get('/api/v1/people')
            .then(res => {
                const personJSON = JSON.parse(JSON.stringify(person));
                expect(res.body).toEqual([personJSON]);
            });
    });

    it('can get a person by id', async() => {
        const person = await Person.create({
            name: 'Alex',
            city: 'Portland',  
            state: 'Oregon',
            email: 'aramirezdecruz@gmail.com'
        });
        
        return request(app)
            .get(`/api/v1/people/${person._id}`)
            .then(res => {
                expect(res.body).toEqual({
                    _id: expect.any(String),
                    name: 'Alex',
                    city: 'Portland',  
                    state: 'Oregon',
                    email: 'aramirezdecruz@gmail.com',
                    __v: 0
                });
            });
    });

    it('can delete a person by id', async() => {
        const person = await Person.create({
            name: 'Alex',
            city: 'Portland',  
            state: 'Oregon',
            email: 'aramirezdecruz@gmail.com'
        });

        return request(app)
            .delete(`/api/v1/people/${person._id}`)
            .then(res => {
                expect(res.body.name).toEqual('Alex');
            });
    });
});
