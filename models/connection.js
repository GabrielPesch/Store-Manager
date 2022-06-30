const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'db',
  port: 3306,
  user: 'root',
  password: 'password',
  database: 'StoreManager',
});

module.exports = db;
