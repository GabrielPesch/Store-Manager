const salesService = require('../services/salesService');

const salesController = {
  async listAll(_req, res) {
    const items = await salesService.list();
    return res.status(200).json(items);
  },

  async get(req, res) {
    const { id } = await salesService.validateParamsId(req.params);
    await salesService.checkExists(id);
    const sale = await salesService.get(id);
    return res.status(200).json(sale);
  },

  async addSale(req, res) {
    const data = await salesService.validateBodyAdd(req.body);
    const products = data.map(({ productId }) => productId);
    await salesService.checkIfArrayOfIdsExists(products);
    const id = await salesService.add(data);
    const message = { id, itemsSold: data };
    return res.status(201).json(message);
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
    return res.status(200).json(message);
  },
};

module.exports = salesController;