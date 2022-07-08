const productsService = require('../services/productsService');

const productsController = {
  async listAll(_req, res) {
    const items = await productsService.list();
    return res.status(200).json(items);
  },

  async get(req, res) {
    const { id } = await productsService.validateParamsId(req.params);
    await productsService.checkExists(id);
    const product = await productsService.get(id);
    return res.status(200).json(product);
  },

  async getByName(req, res) {
    const { q: queryByName } = req.query
    const products = queryByName 
      ? await productsService.getByName(queryByName)
      : await productsService.list()
    res.json(products)
  },

  async add(req, res) {
    const data = await productsService.validateBodyAdd(req.body);
    const id = await productsService.add(data);
    const product = await productsService.get(id);
    return res.status(201).json(product);
  },

  async edit(req, res) {
    const [{ id }, changes] = await Promise.all([
      productsService.validateParamsId(req.params),
      productsService.validateBodyAdd(req.body),
    ]);
    await productsService.checkExists(id);
    await productsService.edit(id, changes);
    const product = await productsService.get(id);
    return res.json(product);
  },
  
  async remove(req, res) {
    const { id } = await productsService.validateParamsId(req.params);
    await productsService.checkExists(id);
    await productsService.remove(id);
    res.sendStatus(204);
  },
};

module.exports = productsController;