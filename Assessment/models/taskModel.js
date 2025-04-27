import mongoose from "mongoose";



const taskScehma = new mongoose.Schema({
  title: { type: String, require: true },
  description: { type: String, require: true, trim: true },
  status: { type: String, require: true, trim: true },
  dueDate: { type: Date, required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId,ref:'User', require: true,},
});

const TaskModel = mongoose.model('Task',taskScehma)

export default TaskModel
