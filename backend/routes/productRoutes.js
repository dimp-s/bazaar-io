import express from 'express';
import Product from '../models/productModel.js';
const productRouter = express.Router();

//get data from Product model and display in homescreen
productRouter.get(`/`, async (req, res) => {
  const products = await Product.find();
  res.send(products);
});

//to get data from single product from backend to productscreen
productRouter.get('/slug/:slug', async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not Found! ' });
  }
});

//to get items in current cart for add to cart
productRouter.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not Found! ' });
  }
});

export default productRouter;
