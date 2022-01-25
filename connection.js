const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'StoraManager',
  password: 'dhaa35nd',
  port: 33060,
});

module.exports = connection;