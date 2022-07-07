const express = require('express');
const swaggerUi = require('swagger-ui-express');

const errorHandler = require('./middlewares/errorHandler');
require('express-async-errors');
const productsRoute = require('./Routes/products');
const salesRoute = require('./Routes/sales');
const swaggerDocs = require('./swagger.json');

const app = express();

app.use(express.json());

app.use('/products', productsRoute);
app.use('/sales', salesRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(errorHandler);

app.get('/', (_request, response) => {
  response.send();
});

module.exports = app;