const db = require('./connection');

const productsModel = {
  async list() {
    const listSql = 'SELECT * FROM products;';
    const [products] = await db.execute(listSql);
    return products;
  },
  async exists(id) {
    const existsSql = 'SELECT 1 FROM products WHERE id = ?;';
    const [[exists]] = await db.execute(existsSql, [id]);
    return !!exists;
  },
  async get(id) {
    const getSql = 'SELECT * FROM products WHERE id = ?;';
    const [[result]] = await db.execute(getSql, [id]);
    return result;
  },
};

module.exports = productsModel;