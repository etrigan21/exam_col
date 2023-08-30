require('dotenv').config();
const joi = require('joi');

const settingSchema = joi.object().keys({
    mongodb: joi.string(),
    port: joi.number(),
    secretKey: joi.string(),
}).unknown().required();

const {value: envVars, error} = settingSchema.prefs({errors: {label: "key"}}).validate(process.env);

if(error){
    throw new Error(`Invalid settings! Error message: ${error.message}`);
}

const settings = {
    mongodb: envVars.MONGODB,
    port: envVars.PORT,
    secretKey: envVars.SECRET_KEY
}


module.exports = settings;