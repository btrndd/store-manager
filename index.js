require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const productsRouter = require('./productsRouter');
const salesRouter = require('./salesRouter');
const products = require('./controllers/productsController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productsRouter);

app.use('/sales', salesRouter);

app.use(products.manageErrors);

app.use(products.serverError);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});