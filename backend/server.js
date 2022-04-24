import express from 'express';
import data from './data.js';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
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

//to convert post request data into json object automatically
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//retrieve seed data
app.use(`/api/seed`, seedRouter);

//retrieves data through provided link from request
app.use(`/api/products`, productRouter);

//retrieves data of users
app.use(`/api/users`, userRouter);

//error handler for express
app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

//define port to respond for backend
const port = process.env.PORT || 5000;
//call app listen to respond to frontend
app.listen(port, () => {
  console.log(`serve at localhost:${port}`);
});
