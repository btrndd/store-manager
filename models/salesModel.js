const connection = require('./connection');

const getAll = async () => {
    const [rows] = await connection.execute('SELECT * FROM sales');
    return rows;
};

const create = async (sale) => {
  const querySales = 'INSERT INTO sales (date) VALUES (?)';
  const [resultSale] = await connection.execute(querySales, [new Date()]);
  sale.forEach(async (product) => {
    const query = ('INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)');
    await connection.execute(query, [resultSale.insertId, product.product_id, product.quantity]);
  });
  const result = {
    id: resultSale.insertId,
    itemsSold: sale,
  };
  return result;
};

// const getById = async (id) => {
//   const [rows] = await connection.execute(
//     'SELECT * FROM sales WHERE id = ?',
//     [id],
//   );
//   const product = rows[0];
//   return product;
// };

// const update = async (id, name, quantity) => {
//   const query = 'UPDATE products SET name = ?, quantity = ? WHERE id = ?';
//   await connection.execute(query, [name, quantity, id]);
//   const product = {
//     id,
//     name,
//     quantity,
//   };
//   return product;
// };

// const remove = async (id) => {
//   const product = getById(id);
//   const query = 'DELETE FROM products WHERE id = ?';
//   await connection.execute(query, [id]);
//   return product;
// };

module.exports = {
    getAll,
    create,
    // getById,
    // update,
    // remove,
};