const express = require('express');
const router = express.Router();

router.all('/:apiName', (req, res) => {
    const apiName = req.params.apiName;
    res.send(`You have requested the ${apiName} API`);
});

module.exports = router;