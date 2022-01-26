const express = require('express');

const router = express.Router();

const products = require('./controllers/productsController');

router.post('/', products.create);

router.get('/', products.getAll);

router.get('/:id', products.getById);

router.put('/:id', products.update);

router.delete('/:id', products.remove);

module.exports = router;