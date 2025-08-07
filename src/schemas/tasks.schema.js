const Joi = require("joi");

const title = Joi.string().min(1);
const description = Joi.string().min(1);
const status = Joi.string();
const assigned_to = Joi.string();
const due_date = Joi.date().min('now').messages({
    'date.min': 'La fecha de vencimiento no puede ser en el pasado'
});

// Schema for create task
const createTaskSchema = Joi.object({
    title: title.required(),
    description: description,
    status: status.default('pending'),
    assigned_to: assigned_to,
    due_date: due_date
});

// Schema for update partial task
const updatePatchTaskSchema = Joi.object({
    title: title,
    description: description,
    status: status,
    assigned_to: assigned_to,
    due_date: due_date
});

// Schema for update full task
const updatePutTaskSchema = Joi.object({
    title: title.required(),
    description: description.required(),
    status: status.required(),
    assigned_to: assigned_to.required(),
    due_date: due_date.required()
});

// Schema for get task by ID
const getTaskByIdSchema = Joi.object({
    id: Joi.string().required()
});

// Schema for get tasks by status
const getTasksByStatusSchema = Joi.object({
    status: Joi.string().valid('pending', 'in-progress', 'completed').required()
});

module.exports = {
    createTaskSchema,
    updatePatchTaskSchema,
    updatePutTaskSchema,
    getTaskByIdSchema,
    getTasksByStatusSchema
}
