const express = require('express')
const movie = express.Router();
const validate = require('express-validation');

const movieValidation = require('../validations').movies;
const movieController = require('../controllers').movies

movie.route('/')
    /** GET /v1/movies - Get list of movies */
    .get(movieController.list)

    /** POST /v1/movies - Create new movie */
    .post(validate(movieValidation.createMovie), movieController.create);

movie.route('/:id')
    /** GET /v1/movies/:id - Detail movie */
    .get(movieController.detail)

    /** PUT /v1/movies/:id - Update movie */
    .put(validate(movieValidation.updateMovie), movieController.update)

    /** DELETE /v1/movies/:id - Delete movie */
    .delete(movieController.delete);

module.exports = movie;