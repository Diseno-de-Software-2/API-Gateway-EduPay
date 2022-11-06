const express = require('express');
const helmet = require('helmet');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const port = 3000 || process.env.PORT;

app.use(express.json())
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());

// const auth = (req, res, next) => {

//     const authString = Buffer.from(req.headers.authorization,'base64').toString('utf8');
//     const authArray = authString.split(':');
//     const username = authArray[0];
//     const password = authArray[1];
// // buscar si en la base de datos existe
//     // if (null) {
//     //     next();
//     // } else {
//     //     res.status(401).json({ message: 'Unauthorized' });
//     // }
// }

// app.use(auth);

app.use('/', routes)

app.listen(port, () => {
    console.log(`App listening at port ${port}`)
});





