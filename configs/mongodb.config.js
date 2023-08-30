const mongoose = require('mongoose');
const settings = require('./main.configs');
mongoose.connect(settings.mongodb)
mongoose.connection.on("error", ()=>{
    throw new Error(`Unable to connect to database: ${settings.mongodb}`)
});