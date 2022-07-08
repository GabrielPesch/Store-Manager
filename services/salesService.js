const Joi = require('joi');
const { NotFoundError } = require('../middlewares/errors');
const { runSchema } = require('../middlewares/validators');
const productsModel = require('../models/productsModel');
const salesModel = require('../models/salesModel');

const salesService = {

  async list() {
    const sales = await salesModel.list();
    return sales;
  },

  async add(data) {
    const saleId = await salesModel.addSale();
    await salesModel.bulkAddBySale(data, saleId);
    return saleId;
  },

  async edit(id, changes) {
    const changesPromises = changes
      .map(({ productId, quantity }) => salesModel.edit([quantity, id, productId]));
    await Promise.all(changesPromises);
  },

  async get(id) {
   const sales = await salesModel.getBySaleId(id);
    return sales;
  },

  async checkIfArrayOfIdsExists(arrayOfIds) {
    const allProductsId = await productsModel.listAllIds();
    const productsId = allProductsId.map(({ id }) => id);

    arrayOfIds.forEach((id) => {
      if (!productsId.includes(id)) {
        throw new NotFoundError('Product not found');
      }
    });
  },

  async checkExists(id) {
    const exists = await salesModel.exists(id);
    if (!exists) throw new NotFoundError('Sale not found');
  },

  async remove(id) {
    await salesModel.remove(id);
  },

  validateBodyAdd: runSchema(
    Joi.array().items(Joi.object(({
      productId: Joi.number()
        .required()
        .positive()
        .integer()
        .label('productId'),
      quantity: Joi.number()
        .required()
        .integer()
        .min(1)
        .label('quantity'),
    }))),
  ),

  validateParamsId: runSchema(
    Joi.object({
      id: Joi.number().required().positive().integer(),
    }).required(),
  ),
};

module.exports = salesService;