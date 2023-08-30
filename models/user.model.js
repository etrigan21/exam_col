const joi = require('joi');
const mongoose = require('mongoose');
const joigoose = require('joigoose')(mongoose);
const passportLocalMongoose = require('passport-local-mongoose');
const userScheme = new joi.object({
    username: joi.string().required(), 
});

const userSchema = new mongoose.Schema(joigoose.convert(userScheme))
userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("user", userSchema, "user");