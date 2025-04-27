import express from 'express';
import { createUser, loginUser } from '../controller/userController.js';
import { check } from 'express-validator';
const userRoutes = express.Router();

userRoutes.post('/create',createUser);
userRoutes.post(
    "/login",
    [
      check("email").isEmail().withMessage("Valid email required"),
      check("password").notEmpty().withMessage("Password is required"),
    ],
    loginUser
  );
export default userRoutes