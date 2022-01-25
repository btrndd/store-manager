const productsModel = require('../models/productsModel');

const create = async (name, quantity) => {
  const product = productsModel.create(name, quantity);
  return product;
};

module.exports = {
  create,
};