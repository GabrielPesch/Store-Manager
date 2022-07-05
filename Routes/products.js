const { Router } = require('express');
const productsController = require('../controllers/productsControllers');

const productsRoute = Router();

productsRoute.put('/:id', productsController.edit);
productsRoute.get('/:id', productsController.get);
productsRoute.get('/', productsController.listAll);
productsRoute.post('/', productsController.add);

module.exports = productsRoute;