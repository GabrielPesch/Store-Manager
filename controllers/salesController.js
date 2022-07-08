const salesService = require('../services/salesService');

const salesController = {
  async listAll(_req, res) {
    const items = await salesService.list();
    res.json(items);
  },

  async get(req, res) {
    const { id } = await salesService.validateParamsId(req.params);
    await salesService.checkExists(id);
    const sale = await salesService.get(id);
     res.json(sale);
  },

  async addSale(req, res) {
    const data = await salesService.validateBodyAdd(req.body);
    const products = data.map(({ productId }) => productId);
    await salesService.checkIfArrayOfIdsExists(products);
    const id = await salesService.add(data);
    const message = { id, itemsSold: data };
    res.status(201).json(message);
  }, 

  async remove(req, res) {
    const { id } = await salesService.validateParamsId(req.params);
    await salesService.checkExists(id);
    await salesService.remove(id);
    res.sendStatus(204);
  },

  async edit(req, res) {
    const [{ id }, changes] = await Promise.all([
      salesService.validateParamsId(req.params),
      salesService.validateBodyAdd(req.body),
    ]);
    await salesService.checkExists(id);

    const products = changes.map(({ productId }) => productId);
    await salesService.checkIfArrayOfIdsExists(products);
    await salesService.edit(id, changes);

    const message = { saleId: id, itemsUpdated: changes };
    res.json(message);
  },
};

module.exports = salesController;