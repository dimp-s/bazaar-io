import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import { generateToken } from '../Utils.js';

const userRouter = express.Router();
userRouter.post(
  `/signin`,
  expressAsyncHandler(async (req, res) => {
    //get user from email
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      //compare encrypted password to check if it is correct
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(400).send({ message: 'invalid email or password!' });
  })
);

export default userRouter;
