const boom = require("@hapi/boom");
const { Task, VALID_STATUSES } = require("../db/models/tasks.model");

class TasksService {
    async findAll() {
        const tasks = await Task.find().sort({ createdAt: -1 });
        return tasks;
    }

    async findById(id) {
        const task = await Task.findById(id);
        if (!task) {
            throw boom.notFound("Tarea no encontrada");
        }
        return task;
    }

    async findByStatus(status) {
        if (!VALID_STATUSES.includes(status)) {
            throw boom.badRequest("Estado inválido");
        }
        const tasks = await Task.find({ status });
        return tasks;
    }

    async create(data) {
        const newTask = await Task.create(data);
        return newTask;
    }

    async update(id, data) {
        const updatedTask = await Task.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        });
        if (!updatedTask) {
            throw boom.notFound("Tarea no encontrada para actualizar");
        }
        return updatedTask;
    }

    async delete(id) {
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            throw boom.notFound("Tarea no encontrada para eliminar");
        }
        return;
    }
}

module.exports = TasksService;
