const joi = require('joi');
const mongoose = require('mongoose');
const joigoose = require('joigoose')(mongoose);
const todoSchema = new joi.object({
    title: joi.string().required(),
    todo: joi.string().required(), 
    done: joi.boolean().default(false),
    user: joi.string().required()
});

const todoScheme = new mongoose.Schema(joigoose.convert(todoSchema))

module.exports = mongoose.model("ToDo", todoScheme, "ToDo");