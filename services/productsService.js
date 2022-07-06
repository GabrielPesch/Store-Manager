const Joi = require('joi');
const productsModel = require('../models/productsModel');
const { NotFoundError } = require('../middlewares/errors');
const { runSchema } = require('../middlewares/validators');

const productsService = {
  async list() {
    const products = await productsModel.list();
    return products;
  },

  async get(id) {
    const product = await productsModel.get(id);
    return product;
  },

  async getByName(query) {
    const products = await productsModel.getByName(query);
    return products;
  },

  async add(data) {
    const id = await productsModel.add(data);
    return id;
  },

  async checkExists(id) {
    const exists = await productsModel.exists(id);
    if (!exists) throw new NotFoundError('Product not found');
  },

  async edit(id, changes) {
    await productsModel.edit(id, changes);
  },

  async remove(id) {
    await productsModel.remove(id);
  },

  validateParamsId: runSchema(
    Joi.object({
      id: Joi.number().required().positive().integer(),
    }).required(),
  ),

  validateBodyAdd: runSchema(
    Joi.object({
      name: Joi.string().min(5).required(),
    }),
  ),

  ValidadeQueryName: runSchema(
    Joi.object({
      q: Joi.string().min(1),
    }),
  ),

};

module.exports = productsService;