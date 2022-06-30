const { Router } = require('express');
const productsController = require('../controllers/productsControllers');

const productsRoute = Router();

productsRoute.get('/:id', productsController.get);
productsRoute.get('/', productsController.listAll);

module.exports = productsRoute;