import express from 'express';
import data from './data.js';

const app = express();

//retrieves data through provided link from request
app.get('/api/products', (req, res) => {
  res.send(data.products);
});

//to get data from single product from backend
app.get('/api/products/slug/:slug', (req, res) => {
  const product = data.products.find((item) => item.slug === req.params.slug);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not Found! ' });
  }
});

//to get items in current cart for add to cart
app.get('/api/products/:id', (req, res) => {
  const product = data.products.find((item) => item._id === req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not Found! ' });
  }
});

//define port to respond for backend
const port = process.env.PORT || 5000;
//call app listen to respond to frontend

app.listen(port, () => {
  console.log(`serve at localhost:${port}`);
});
