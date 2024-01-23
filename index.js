const express = require('express');
const cors = require('cors')
const app = express();


const router = require('./src/routes');

require('./startup/config')(app,express,cors);
require('./startup/db')();
require('./startup/logging')();


app.use('/api', router);

// const port = process.env.PORT || 3000;
const port = 8080;
app.listen(port, ()=> console.log(`listening on port ${port}`));