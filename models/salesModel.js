const connection = require('./connection');

const getAll = async () => {
    const query = (
     `SELECT sales.id AS saleId, sales.date, sales_products.product_id, sales_products.quantity
    FROM sales
    INNER JOIN sales_products
    ON sales.id = sales_products.sale_id`);
    const [rows] = await connection.execute(query);
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

const getById = async (id) => {
  const query = (
    `SELECT sales.date, sales_products.product_id, sales_products.quantity
    FROM sales
    INNER JOIN sales_products
    ON sales.id = sales_products.sale_id
    WHERE sales.id = ?`);
  const [rows] = await connection.execute(query, [id]);
  const sales = rows;
  return sales;
};

const update = async (id, sale) => {
  const query = 'UPDATE sales_products SET quantity = ? WHERE product_id = ? AND sale_id = ?';
  await connection.execute(query, [sale.quantity, sale.product_id, id]);
  const saleUpdated = {
    saleId: id,
    itemUpdated: [sale],
  };
  return saleUpdated;
};

module.exports = {
    getAll,
    create,
    getById,
    update,
};