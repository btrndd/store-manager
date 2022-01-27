const rescue = require('express-rescue');
const salesService = require('../services/salesService');

const create = rescue(async (req, res) => {
  const sale = req.body;
  sale.forEach((product) => {
    if (!product.product_id) {
      const error = {
        code: 'requiredParameter',
        message: '"product_id" is required',
      };
      throw error;
    } if (!product.quantity && product.quantity !== 0) {
      const error = {
        code: 'requiredParameter',
        message: '"quantity" is required',
      };
      throw error;
    }
  });
  const resultSale = await salesService.create(sale);
  res.status(201).json(resultSale);
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
  // update,
  // remove,
  // getAll,
  // getById,
  manageErrors,
  serverError,
};