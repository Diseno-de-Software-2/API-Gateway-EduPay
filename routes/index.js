const express = require('express');
const router = express.Router();
const axios = require('axios');
const registry = require('./registry.json')
const fs = require('fs');
const loadbalancer = require('../util/loadbalancer');
const { response } = require('express');


router.post('/switch/:apiName', (req, res, next) => {
    const apiName = req.params.apiName;
    const requestBody = req.body;
    const instances = registry.services[apiName].instances;
    const instance = instances.findIndex(service => service.url === requestBody.url);
    if (instance === -1) {
        return res.status(400).json({ message: 'Service not found' });
    } else {
        instances[instance].enabled = requestBody.enabled;
        fs.writeFile('./routes/registry.json', JSON.stringify(registry), (err) => {
            if (err) {
                res.send(err);
            } else {
                res.send('Service updated');
            }
        });
    }
});

router.all('/:apiName/:path', async (req, res) => {
    // tengo que confirmar que el servicio esté activo con la base de datos y mandar un error si no lo está
    const service = registry.services[req.params.apiName];
    if (service) {
        if (!service.loadBalancerStrategy) {
            service.loadBalancerStrategy = 'ROUND_ROBIN';
            fs.writeFile('./routes/registry.json', JSON.stringify(registry), (err) => {
                if (err) {
                    console.log(err);
                    res.send("Couldn't write load balancer strategy to registry");
                }
            });
        }

        // check if there are no active instances
        const activeInstances = service.instances.filter(instance => instance.enabled);
        if (activeInstances.length === 0) {
            return res.status(500).json({ message: 'No active instances' });
        }

        const newIndex = loadbalancer[service.loadBalancerStrategy](service);
        const url = service.instances[newIndex].url;
        axios({
            method: req.method,
            url: `${url}/${req.params.path}`,
            headers: req.headers,
            data: req.body
        }).then(response => {
            res.send(response.data);
        }).catch(err => {
            if (err.response) {
                res.status(err.response.status).send(err.response.data);
            } else {
                res.status(500).send(err.message);
            }
        });

    } else {
        res.send('Service not found');
    }
});

router.post('/register', (req, res) => {
    const registrationInfo = req.body;
    registrationInfo.url = registrationInfo.protocol + '://' + registrationInfo.host + ':' + registrationInfo.port;
    if (apiAlreadyRegistered(registrationInfo)) {
        res.send('Service already registered');
    } else {
        registry.services[req.body.apiName].instances.push({ ...req.body });
        fs.writeFile('./routes/registry.json', JSON.stringify(registry), (err) => {
            if (err) {
                console.log(err);
                res.send('Error registering service');
            }
        });
        res.send('Service registered');
    }
});

router.post('/unregister', (req, res) => {
    const registrationInfo = req.body;

    if (apiAlreadyRegistered(registrationInfo)) {
        const index = registry.services[registrationInfo.apiName].instances.findIndex(service => service.url === registrationInfo.url);
        registry.services[registrationInfo.apiName].instances.splice(index, 1);
        fs.writeFile('./routes/registry.json', JSON.stringify(registry), (err) => {
            if (err) {
                console.log(err);
                res.send('Error unregistering service');
            } else {
                res.send('Service unregistered');
            }
        });
    } else {
        res.send('Service not registered');
    }
});


function apiAlreadyRegistered(registrationInfo) {
    return registry.services[registrationInfo.apiName].instances.find(service => service.url === registrationInfo.url);
}

module.exports = router;