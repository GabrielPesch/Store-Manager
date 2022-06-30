const Joi = require('joi');
const productsModel = require('../models/productsModel');
const { NotFoundError } = require('./errors');
const { runSchema } = require('./validators');

const productsService = {
  async list() {
    const products = await productsModel.list();
    return products;
  },

  async get(id) {
    const product = await productsModel.get(id);
    return product;
  },

  validateParamsId: runSchema(
    Joi.object({
      id: Joi.number().required().positive().integer(),
    }).required(),
  ),
  async checkNotExists(id) {
    const exists = await productsModel.exists(id);
    if (!exists) throw new NotFoundError('Product not found');
  },
};

module.exports = productsService;