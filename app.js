const express = require('express');
const app = express();
const routes = require('./routes');
const port = 3000 || process.env.PORT;

app.use(express.json())

app.use('/', routes)

app.listen(port, () => {
    console.log(`App listening at port ${port}`)
});





