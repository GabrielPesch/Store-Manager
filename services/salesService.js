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
    const dataMap = data.map((sale) => [saleId, sale.productId, sale.quantity]);
    await salesModel.bulkAddBySale([dataMap]);
    return saleId;
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