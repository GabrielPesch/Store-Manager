const productsService = require('../services/productsService');

const productsController = {
  async listAll(_req, res) {
    const items = await productsService.list();
    return res.status(200).json(items);
  },
  async get(req, res) {
    const { id } = await productsService.validateParamsId(req.params);
    await productsService.checkNotExists(id);
    const product = await productsService.get(id);
    return res.status(200).json(product);
},
};

module.exports = productsController;