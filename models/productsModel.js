const connection = require('./connection');

// const serialize = (product) => ({
//   id: product.id,
//   name: product.name,
//   quantity: product.quantity,
// });

const getAll = async () => {
    const [rows] = await connection.execute('SELECT * FROM products');

    return rows;
};

const create = async (name, quantity) => {
  const [rows] = await connection.execute(
    'INSERT INTO products (name, quantity) VALUES (?, ?)',
    [name, quantity],
  );

  const result = {
    id: rows.insertId,
    name,
    quantity,
  };

  return result;
};

module.exports = {
    getAll,
    create,
};