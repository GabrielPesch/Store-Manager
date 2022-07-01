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

  async add(data) {
    const id = await productsModel.add(data);
    return id;
  },

  async checkNotExists(id) {
    const exists = await productsModel.exists(id);
    if (!exists) throw new NotFoundError('Product not found');
  },

  validateParamsId: runSchema(
    Joi.object({
      id: Joi.number().required().positive().integer(),
    }).required(),
  ),

  validateBodyAdd: runSchema(
    Joi.object({
      name: Joi.string(),
    }).required(),
  ),
};

module.exports = productsService;