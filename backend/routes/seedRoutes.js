import express from 'express';
import Product from '../models/productModel.js';
import data from '../data.js';
import User from '../models/userModel.js';

//create route using express
const seedRouter = express.Router();

seedRouter.get(`/`, async (req, res) => {
  //returns and remove all records of product
  await Product.remove({});
  //use records in data.js to add to products
  const createdProducts = await Product.insertMany(data.products);

  //seeding for users
  await User.remove({});
  //use records in data.js to add to users
  const createdUsers = await User.insertMany(data.users);

  res.send({ createdProducts, createdUsers });
});

export default seedRouter;
