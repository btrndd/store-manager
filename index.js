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

app.use((err, _req, res, next) => {
  const errorMap = {
    notFound: 404,
    requiredParameter: 400,
    invalidData: 422,
    alreadyExists: 409,

  };
  const status = errorMap[err.code];
  if (!status) {
    return next(err);
  }
  res.status(status).json(err);
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ message: 'server error' });
});

app.listen(process.env.PORT, () => {
  console.log(`Escutando na porta ${process.env.PORT}`);
});