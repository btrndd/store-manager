const productsModel = require('../models/productsModel');

const verifyName = async (name, id) => {
  if (name.length < 5) {
    const error = {
      code: 'invalidData',
      message: '"name" length must be at least 5 characters long',
    };
    throw error;
  }
  const productName = await productsModel.getByName(name);
  if (!id && productName.some((product) => product === name)) {
    const error = {
      code: 'alreadyExists',
      message: 'Product already exists',
    };
    throw error;
  }
};

const verifyQuantity = (quantity) => {
  if (quantity < 1 || typeof quantity !== 'number') {
    const error = {
      code: 'invalidData',
      message: '"quantity" must be a number larger than or equal to 1',
    };
    throw error;
  }
};

const create = async (name, quantity) => {
  await verifyName(name);
  verifyQuantity(quantity);
  const product = await productsModel.create(name, quantity);
  return product;
};

const update = async (id, name, quantity) => {
  await verifyName(name, id);
  verifyQuantity(quantity);
  const product = await productsModel.getById(id);  
  if (!product) {
    const error = {
      code: 'notFound',
      message: 'Product not found',
    };
    throw error;
  }
  const newProduct = await productsModel.update(id, name, quantity);
  return newProduct;
};

const remove = async (id) => {
  const product = await productsModel.getById(id);  
  if (!product) {
    const error = {
      code: 'notFound',
      message: 'Product not found',
    };
    throw error;
  }
  const productRemoved = await productsModel.remove(id);
  return productRemoved;
};

const getAll = async () => {
  const products = await productsModel.getAll();
  return products;
};

const getById = async (id) => {
  const product = await productsModel.getById(id);  
  if (!product) {
    const error = {
      code: 'notFound',
      message: 'Product not found',
    };
    throw error;
  }
  return product;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};