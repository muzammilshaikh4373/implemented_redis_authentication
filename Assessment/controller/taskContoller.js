import TaskModel from "../models/taskModel.js";
import redisClient from "../config/redisClient.js";

const createTask = async (req, res) => {
  try {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 7);

    // If all fields exist, create a new task
    const task = new TaskModel({ ...req.body, dueDate });
    await task.save();

    // Invalidate cache after creating
    await redisClient.del("tasks");

    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Something went wrong", error: error.message });
  }
};

// Get Single Task by ID
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await TaskModel.findById(id).populate("assignedTo");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch task", error: error.message });
  }
};

// Get All Tasks (with optional filters)
const getAllTasks = async (req, res) => {
  try {
    const { status, dueDate } = req.query;
    const filter = {};

    if (status) {
      filter.status = status;
    }

    if (dueDate) {
      filter.dueDate = { $lte: new Date(dueDate) }; // Get tasks due before or on given date
    }
    
    const cacheKey = `tasks:${req.query.status || 'all'}`;

    const cachedTasks = await redisClient.get(cacheKey);
    if (cachedTasks) {
      console.log("Serving from Redis cache");
      return res.status(200).json(JSON.parse(cachedTasks));
    }
    const tasks = await TaskModel.find(filter).populate("assignedTo");
    await redisClient.setEx(cacheKey, 60, JSON.stringify(tasks));

    res.status(200).json(tasks);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch tasks", error: error.message });
  }
};

// Update Task
const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedTask = await TaskModel.findByIdAndUpdate(id, updates, {
      new: true,
    }).populate("assignedTo");

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    await redisClient.del("tasks");

    res.status(200).json({ message: "Task updated successfully", updatedTask });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to update task", error: error.message });
  }
};

// Delete Task
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTask = await TaskModel.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to delete task", error: error.message });
  }
};

export { createTask, deleteTask, updateTask, getAllTasks, getTaskById };
