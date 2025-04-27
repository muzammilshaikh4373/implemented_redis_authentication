// middlewares/taskValidator.js
import { body } from 'express-validator';

export const taskValidationRules = [
  body('title')
    .notEmpty()
    .withMessage('Title is required'),
    
  body('description')
    .notEmpty()
    .withMessage('Description is required'),

  body('status')
    .notEmpty()
    .withMessage('Status is required'),

  body('assignedTo')
    .notEmpty()
    .withMessage('AssignedTo is required')
    .isMongoId()
    .withMessage('AssignedTo must be a valid Mongo ID')
];
