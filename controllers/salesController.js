const salesService = require('../services/salesService');

const salesController = {

  async addSale(req, res) {
    const data = await salesService.validateBodyAdd(req.body);
    const products = data.map(({ productId }) => productId);
    await salesService.checkIfArrayOfIdsExists(products);
    const id = await salesService.add(data);
    const message = { id, itemsSold: data };
    return res.status(201).json(message);
  }, 

};

module.exports = salesController;