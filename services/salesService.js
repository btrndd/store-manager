const salesModel = require('../models/salesModel');

// const verifyName = async (name, id) => {
//   if (name.length < 5) {
//     const error = {
//       code: 'invalidData',
//       message: '"name" length must be at least 5 characters long',
//     };
//     throw error;
//   }
//   const productName = await productsModel.getByName(name);
//   if (!id && productName.some((product) => product === name)) {
//     const error = {
//       code: 'alreadyExists',
//       message: 'Product already exists',
//     };
//     throw error;
//   }
// };

const verifyQuantity = (quantity) => {
  if (quantity < 1 || typeof quantity !== 'number') {
    const error = {
      code: 'invalidData',
      message: '"quantity" must be a number larger than or equal to 1',
    };
    throw error;
  }
};

const create = async (sale) => {
  // await verifyName(name);
  sale.forEach((product) => {
    verifyQuantity(product.quantity);
  });  
  const resultSale = await salesModel.create(sale);
  return resultSale;
};

module.exports = {
  create,
};