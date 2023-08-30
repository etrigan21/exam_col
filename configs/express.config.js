const express = require('express');
const logger = require('morgan');
const settings = require('./main.configs');
const session = require('express-session')
const MongoStore = require('connect-mongo');
const localStrategy = require('passport-local').Strategy;
const user= require('../models/user.model');
const passport = require('passport');
const routes = require('../routes/index.routes');
const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(logger("combined"));
app.use(session({
    secret: settings.secretKey, 
    resave: false, 
    saveUninitialized: true, 
    store: new MongoStore({mongoUrl: settings.mongodb})
}));

const strategy = new localStrategy(user.authenticate())
passport.use(strategy);
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
app.use(passport.initialize());
app.use('/api', passport.session(),routes);
module.exports = app;