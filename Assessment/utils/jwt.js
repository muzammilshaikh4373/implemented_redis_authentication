// utils/jwtUtils.js
import jwt from "jsonwebtoken";
import dotenv from 'dotenv'
dotenv.config()
const SECRET_KEY = process.env.JWT_SEC; 

export const generateToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, SECRET_KEY, {
    expiresIn: "1h", // Token expires in 1 hour
  });
};

export const verifyToken = (token) => {
  return jwt.verify(token, SECRET_KEY);
};
