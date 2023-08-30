const settings = require('./configs/main.configs');
const app = require('./configs/express.config');
require('./configs/mongodb.config');

app.listen(settings.port, ()=>{
    console.log(`Server started on port ${settings.port}`);
})
module.exports = app;