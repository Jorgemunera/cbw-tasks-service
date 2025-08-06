const express = require("express");
const TasksService = require("../services/tasks.service");
const validatorHandler = require("../middlewares/validator.handler");
const {
    createTaskSchema,
    updatePatchTaskSchema,
    updatePutTaskSchema,
    getTaskByIdSchema,
    getTasksByStatusSchema
} = require("../schemas/tasks.schema");

const service = new TasksService();
const router = express.Router();

// get all tasks
router.get("/", async (req, res, next) => {
    try {
        const tasks = await service.findAll();
        res.status(200).json(tasks);
    } catch (error) {
        next(error)
    }
});

// get task by ID
router.get("/:id",
    validatorHandler(getTaskByIdSchema, 'params'),
    async (req, res, next) => {
    try {
        const { id } = req.params;
        const task = await service.findById(id);
        res.status(200).json(task);
    } catch (error) {
        next(error)
    }
});

// get tasks by status
router.get("/status/:status",
    validatorHandler(getTasksByStatusSchema, 'params'),
    async (req, res, next) => {
    try {
        const { status } = req.params;
        const tasks = await service.findByStatus(status);
        res.status(200).json(tasks);
    } catch (error) {
        next(error)
    }
});

// create task
router.post("/",
    validatorHandler(createTaskSchema, 'body'),
    async (req, res, next) => {
    try {
        const data = req.body;
        const newTask = await service.create(data);
        res.status(201).json(newTask);
    } catch (error) {
        next(error)
    }
});

// update task (patch)
router.patch("/:id",
    validatorHandler(getTaskByIdSchema, 'params'),
    validatorHandler(updatePatchTaskSchema, 'body'),
    async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedTask = await service.update(id, data);
        res.status(200).json(updatedTask);
    } catch (error) {
        next(error)
    }
});

// update task (put)
router.put("/:id",
    validatorHandler(getTaskByIdSchema, 'params'),
    validatorHandler(updatePutTaskSchema, 'body'),
    async (req, res, next) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedTask = await service.update(id, data);
        res.status(200).json(updatedTask);
    } catch (error) {
        next(error)
    }
});

// delete task
router.delete("/:id",
    validatorHandler(getTaskByIdSchema, 'params'),
    async (req, res, next) => {
    try {
        const { id } = req.params;
        await service.delete(id);
        res.status(204).send();
    } catch (error) {
        next(error)
    }
});

module.exports = router;
