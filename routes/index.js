const express = require('express');
const router = express.Router();
const axios = require('axios');
const registry = require('./registry.json')
const fs = require('fs');

router.all('/:apiName/:path', async (req, res) => {
    // tengo que confirmar que el servicio esté activo con la base de datos y mandar un error si no lo está
    if (registry.services[req.params.apiName]) {
        const response = await axios({
            method: req.method,
            url: `${registry.services[req.params.apiName].url}/${req.params.path}`,
            headers: req.headers,
            data: req.body
        });
        res.send(response.data);
    } else {
        res.send('Service not found');
    }
});

router.post('/register', (req, res) => {
    const registrationInfo = req.body;
    registrationInfo.url = registrationInfo.protocol + '://' + registrationInfo.host + ':' + registrationInfo.port;

    registry.services[req.body.apiName] = { ...req.body };
    fs.writeFile('./routes/registry.json', JSON.stringify(registry), (err) => {
        if (err) {
            console.log(err);
            res.send('Error registering service');
        }
    });
    res.send('Service registered');
});


module.exports = router;