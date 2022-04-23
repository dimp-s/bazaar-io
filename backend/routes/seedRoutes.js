import express from 'express';
import Product from '../models/productModel.js';
import data from '../data.js';

//create route using express
const seedRouter = express.Router();

seedRouter.get(`/`, async (req, res) => {
  //returns and remove all records of product
  await Product.remove({});
  //use records in data.js to add to products
  const createdProducts = await Product.insertMany(data.products);
  res.send({ createdProducts });
});

export default seedRouter;
