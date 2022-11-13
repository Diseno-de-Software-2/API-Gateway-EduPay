const express = require('express');
const helmet = require('helmet');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes');
const jwt = require('jsonwebtoken');
var setTerminalTitle = require('set-terminal-title');
setTerminalTitle('API Gateway', { verbose: true });
const port = 3000 || process.env.PORT;

app.use(express.json())
app.use(helmet());
app.use(morgan('dev'));
app.use(cors());

const verifyToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        jwt.verify(bearerHeader, 'secret', (err, authData) => {
            if (err) {
                res.sendStatus(403);
            }
            else {
                next();
            }
        });
    } else {
        if (req.url === '/auth/login') {
            next();
        } else if (req.url.includes('/register')) {
            next();
        } else if (req.url.includes('/unregister')) {
            next();
        } else if (req.url.includes('/switch')) {
            next();
        } else {
            console.log('No token provided ', req.url);
            res.sendStatus(403);
        }
    }
}

app.use(verifyToken);

app.use('/', routes)

app.listen(port, () => {
    console.log(`App listening at port ${port}`)
});





