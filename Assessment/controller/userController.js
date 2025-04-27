import { validationResult } from "express-validator";
import UserModel from "../models/userModel.js";
import { generateToken } from "../utils/jwt.js";

const createUser = async (req, res) => {
    try {
      const { name, email, role,password  } = req.body;
  
      if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
      }
  
      const user = new UserModel({ name, email, role,password});
      await user.save();
  
      res.status(201).json({ message: 'User created successfully', user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Something went wrong', error: error.message });
    }
  };

  
  export const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
  
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
  
      const token = generateToken(user);
      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      res.status(500).json({ message: "Server Error", error: error.message });
    }
  };

  export {createUser}