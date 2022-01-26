require('dotenv').config();
const express = require('express');

const bodyParser = require('body-parser');

const products = require('./controllers/productsController');

const app = express();

app.use(bodyParser.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.send();
});

app.post('/products', products.create);

app.get('/products', products.getAll);
app.get('/products/:id', products.getById);

app.use(products.manageErrors);

app.use(products.serverError);

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});