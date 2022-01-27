const salesModel = require('../models/salesModel');

const verifyQuantity = (quantity) => {
  if (quantity < 1 || typeof quantity !== 'number') {
    const error = {
      code: 'invalidData',
      message: '"quantity" must be a number larger than or equal to 1',
    };
    throw error;
  }
};

const getAll = async () => {
  const sales = await salesModel.getAll();
  return sales;
};

const getById = async (id) => {
  const sale = await salesModel.getById(id);  
  if (!sale || sale.length === 0) {
    const error = {
      code: 'notFound',
      message: 'Sale not found',
    };
    throw error;
  }
  return sale;
};

const create = async (sale) => {
  sale.forEach((product) => {
    verifyQuantity(product.quantity);
  });  
  const resultSale = await salesModel.create(sale);
  return resultSale;
};

module.exports = {
  create,
  getById,
  getAll,
};