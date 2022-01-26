const rescue = require('express-rescue');
// const Joi = require('@hapi/joi');
const productsService = require('../services/productsService');

const create = rescue(async (req, res) => {
  const { name, quantity } = req.body;
  if (!name) {
    const error = {
      code: 'requiredParameter',
      message: '"name" is required',
    };
    throw error;
  }
  if (!quantity && quantity !== 0) {
    const error = {
      code: 'requiredParameter',
      message: '"quantity" is required',
    };
    throw error;
  }
  const product = await productsService.create(name, quantity);
  res.status(201).json(product);
});

module.exports = {
  create,
};