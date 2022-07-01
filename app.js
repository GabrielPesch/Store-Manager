const express = require('express');
const { errorMiddleware } = require('./middlewares/ErrorMiddleware');
require('express-async-errors');
const productsRoute = require('./middlewares/products.routes');

const app = express();
app.use(express.json());

app.use('/products', productsRoute);

app.use(errorMiddleware);

// não remova esse endpoint, é para o avaliador funcionar!
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;