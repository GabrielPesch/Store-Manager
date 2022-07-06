const db = require('./connection');

const productsModel = {
  async list() {
    const listSql = 'SELECT * FROM StoreManager.products;';
    const [products] = await db.execute(listSql);
    return products;
  },

  async exists(id) {
    const existsSql = 'SELECT 1 FROM StoreManager.products WHERE id = ?;';
    const [[exists]] = await db.execute(existsSql, [id]);
    return !!exists;
  },

  async get(id) {
    const getSql = 'SELECT * FROM StoreManager.products WHERE id = ?;';
    const [[result]] = await db.execute(getSql, [id]);
    return result;
  },

  async getByName(query) {
    const getSQL = `
    SELECT * FROM StoreManager.products
     WHERE name LIKE ?`;
    const [products] = await db.execute(getSQL, [`%${query}%`]);
    return products;
  },

  async add(data) {
    const sql = `
      INSERT INTO StoreManager.products (name)
      VALUES (?);`;
    const [{ insertId }] = await db.execute(sql, [data.name]);
    return insertId;
  },

  async edit(id, changes) {
    const editSql = `
    UPDATE StoreManager.products
    SET ?
    WHERE id = ?`;
    await db.query(editSql, [changes, id]);
  },

  async remove(id) {
    const removeSql = `
    DELETE from StoreManager.products
    WHERE id = ?`;
    await db.execute(removeSql, [id]);
  },

  async listAllIds() {
    const sql = 'SELECT id FROM StoreManager.products';
    const [items] = await db.execute(sql);
    return items;
  },
};

module.exports = productsModel;