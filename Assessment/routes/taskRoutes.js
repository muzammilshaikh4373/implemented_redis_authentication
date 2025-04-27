import express from 'express';
import { createTask, deleteTask, getAllTasks, getTaskById, updateTask } from '../controller/taskContoller.js';
import { taskValidationRules } from '../utils/taskValidator.js';
import { validate } from '../utils/validateMiddleware.js';
import { adminOnly, protect } from '../auth/authentication.js';
const taskRoutes = express.Router();

taskRoutes.post('/create',protect,taskValidationRules,validate,createTask);
taskRoutes.get('/tasks/:id',protect, getTaskById);

// Get All Tasks (with optional filters)
taskRoutes.get('/tasks', protect,getAllTasks);
taskRoutes.put('/tasks/:id',protect, updateTask);
taskRoutes.delete('/tasks/:id',protect,adminOnly, deleteTask);
export default taskRoutes