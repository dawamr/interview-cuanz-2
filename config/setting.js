const Joi = require('joi');

// require and configure dotenv, will load vars in .env in PROCESS.ENV
require('dotenv').config();

// define validation for all the env vars
const envSchema = Joi.object({

    NODE_ENV: Joi.string().default('development'),

    PORT: Joi.number(),
    
}).unknown()
    .required();

const { error, value: env } = envSchema.validate(process.env);

if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const setting = {
    env: env.NODE_ENV,
    port: env.PORT

};

module.exports = setting;