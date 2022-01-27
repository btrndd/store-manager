const express = require('express');

const router = express.Router();

const sales = require('./controllers/salesController');

router.post('/', sales.create);

router.get('/', sales.getAll);

router.get('/:id', sales.getById);

router.put('/:id', sales.update);

module.exports = router;