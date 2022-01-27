const express = require('express');

const router = express.Router();

const sales = require('./controllers/salesController');

router.post('/', sales.create);

// router.get('/', sales.getAll);

module.exports = router;