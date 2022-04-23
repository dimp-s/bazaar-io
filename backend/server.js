import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';

//connecting to mongodb cloud atlas
dotenv.config();
//returns promise
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to Database');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();
app.use(`/api/seed`, seedRouter);

//retrieves data through provided link from request
app.use(`/api/products`, productRouter);

//define port to respond for backend
const port = process.env.PORT || 5000;
//call app listen to respond to frontend

app.listen(port, () => {
  console.log(`serve at localhost:${port}`);
});
