const db = require('./connection');

const salesModel = {
  async list() {
    const listSql = `
      SELECT p.sale_id AS saleId, s.date, p.product_id AS productId, p.quantity
      FROM StoreManager.sales AS s
      INNER JOIN StoreManager.sales_products AS p ON s.id = p.sale_id
      ORDER BY s.id, p.product_id`;
    const [sales] = await db.execute(listSql);
    return sales;
  },

  async exists(id) {
    const existSql = `
    SELECT 1 FROM StoreManager.sales_products  
    WHERE sale_id = ?`;
    const [[exists]] = await db.execute(existSql, [id]);
    return !!exists;
  },

  async addSale() {
    const sql = 'INSERT INTO StoreManager.sales (id, date) VALUES (DEFAULT, DEFAULT)';
    const [{ insertId }] = await db.execute(sql);
    return insertId;
  },

  async bulkAddBySale(data, saleId) {
    const dataMap = data.map((sale) => [saleId, sale.productId, sale.quantity]);
    const sql = `
    INSERT INTO StoreManager.sales_products
    (sale_id, product_id, quantity)
    VALUES ?`;
    const [{ affectedRows }] = await db.query(sql, [dataMap]);
    return !!affectedRows;
  },

  async getBySaleId(id) {
    const sql = `
    SELECT s.date, sp.product_id AS productId, sp.quantity
    FROM  StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s ON sp.sale_id = s.id
    WHERE s.id = ?
    `;
    const [result] = await db.execute(sql, [id]);
    return result;
  },

  async remove(id) {
    const removeSql = `
    DELETE FROM StoreManager.sales
    WHERE id = ?
    `;
    await db.execute(removeSql, [id]);
  },

  async edit(changes) {
    const editSql = `
    UPDATE StoreManager.sales_products
    SET quantity = ?
    WHERE sale_id = ? AND product_id = ?
    `;
    await db.query(editSql, changes);
  },
};

module.exports = salesModel;