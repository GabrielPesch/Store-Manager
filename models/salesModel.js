const db = require('./connection');

const salesModel = {
  async addSale() {
    const sql = 'INSERT INTO StoreManager.sales (id, date) VALUES (DEFAULT, DEFAULT)';
    const [{ insertId }] = await db.execute(sql);
    return insertId;
  },

  async bulkAddBySale(data) {
    const sql = `
    INSERT INTO StoreManager.sales_products
    (sale_id, product_id, quantity)
    VALUES ?`;
    const [{ affectedRows }] = await db.query(sql, data);
    return !!affectedRows;
  },

  async getBySaleId(id) {
    const sql = `
    SELECT s.date, sp.product_id, sp.quantity
    FROM  StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s ON sp.sale_id = s.id
    WHERE s.id = ?
    `;
    const [result] = await db.execute(sql, [id]);
    return result;
  },
};

module.exports = salesModel;