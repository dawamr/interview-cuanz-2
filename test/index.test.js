const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');
const helpers = require('./helper');


describe('Movie API Endpoint Tests', () => { 
    it('GET /v1/movies', async () => {
        const response = await request(app)
        .get('/v1/movies');
        // console.log(response.body.success);
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal('Get list data movie.');
        expect(response.body).to.have.property('data');
    });

    it('POST /v1/movies', async () => {
        let movie = {
            title: 'Test Movie',
            year: 2022,
            published: true,
            description: 'Test Movie',
            createdAt: new Date(),
            updatedAt: new Date()
        };

        const response = await request(app)
            .post('/v1/movies')
            .send(movie);
        
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal('Success create movie.');
        expect(response.body).to.have.property('data');
    });

    it('GET /v1/movies/:id', async () => {

        const movie = await helpers.createProduct();

        const response = await request(app)
                .get(`/v1/movies/${movie.movie.id}`);

        // console.log(response.body.success);
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal('Get data movie.');
        expect(response.body).to.have.property('data');
    });

    it('PUT /v1/movies/:id', async () => {
        const updateData = {
            qty: 5,
        }
        
        const movie = await helpers.createProduct();

        const response = await request(app)
        .put(`/v1/movies/${movie.movie.id}`)
        .send(updateData);

        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal('Success update movie.');
        expect(response.body).to.have.property('data');
    });

    it('DELETE /v1/movies/:id', async () => {
        const movie = await helpers.createProduct();

        const response = await request(app)
        .delete(`/v1/movies/${movie.movie.id}`);              
        
        expect(response.statusCode).to.equal(200);
        expect(response.body).to.have.property('message');
        expect(response.body.message).to.equal('Success delete movie.');
        expect(response.body).to.have.property('data');
    });

})