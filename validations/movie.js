const Joi = require('joi');

module.exports = {

    createMovie: {
        body: {
            title: Joi.string().required(),
            year: Joi.number().integer().min(1900).max(new Date().getFullYear() + 3).required(),
            description: Joi.string(),
            published: Joi.boolean().default(false)
        }
    },

    
    updateMovie: {
        body: {
            title: Joi.string(),
            year: Joi.number().integer().min(1900).max(new Date().getFullYear() + 3),
            description: Joi.string(),
            published: Joi.boolean()
        },
        params: {
            id: Joi.number().required()
        }
    },
};