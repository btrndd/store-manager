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

const getByName = async (name) => {
  const [rows] = await connection.execute(
    'SELECT name FROM products WHERE name = ?',
    [name],
  );
  const result = rows.map((row) => row.name);
  return result;
};

module.exports = {
    getAll,
    create,
    getByName,
};