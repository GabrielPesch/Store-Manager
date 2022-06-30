const express = require('express');
require('express-async-errors');
const productsRoute = require('./middlewares/products.routes');

const app = express();
app.use(express.json());

app.use('/products', productsRoute);

app.use((err, _req, res, _next) => {
  switch (err.name) {
    case 'ValidationError':
      return res.status(400).json({ message: err.message });
    case 'ProductNotFoundError':
      return res.status(404).json({ message: err.message });
    default:
      return res.status(500).json({ message: err.message });
  }
});

// não remova esse endpoint, é para o avaliador funcionar!
app.get('/', (_request, response) => {
  response.send();
});

// não remova essa exportação, é para o avaliador funcionar
// você pode registrar suas rotas normalmente, como o exemplo acima
// você deve usar o arquivo index.js para executar sua aplicação 
module.exports = app;