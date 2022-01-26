const rescue = require('express-rescue');
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

const update = rescue(async (req, res) => {
  const { body: { name, quantity }, params: { id } } = req;
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
  const product = await productsService.update(id, name, quantity);
  res.status(200).json(product);
});

const remove = rescue(async (req, res) => {
  const { id } = req.params;
  const product = await productsService.remove(id);
  res.status(200).json(product);
});

const getAll = rescue(async (_req, res) => {
  const products = await productsService.getAll();
  res.status(200).json(products);
});

const getById = rescue(async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getById(id);
  res.status(200).json(product);
});

const manageErrors = (err, _req, res, next) => {
  const errorMap = {
    notFound: 404,
    requiredParameter: 400,
    invalidData: 422,
    alreadyExists: 409,

  };
  const status = errorMap[err.code];
  if (!status) {
    return next(err);
  }
  res.status(status).json(err);
};

const serverError = (err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'server error' });
};

module.exports = {
  create,
  update,
  remove,
  getAll,
  getById,
  manageErrors,
  serverError,
};