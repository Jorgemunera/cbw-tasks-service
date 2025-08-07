const boom = require("@hapi/boom");
const { Task, VALID_STATUSES } = require("../db/models/tasks.model");
const { getChannel } = require("../libs/rabbitmq");
const { config } = require("../config/config");

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

    async schedule(id) {
        const task = await Task.findById(id);
        if (!task) {
            throw boom.notFound("Tarea no encontrada para programar");
        }

        const channel = getChannel();

        const payload = {
            id: task._id,
            title: task.title,
            due_date: task.due_date,
            scheduled_at: new Date()
        };

        channel.sendToQueue(
            config.rabbitmqQueue,
            Buffer.from(JSON.stringify(payload)),
            {
                persistent: true
            }
        );

        return { message: "Tarea programada correctamente", taskId: id };
    }

    async generateCompletedReportJob() {
        const channel = getChannel();

        const payload = {
            type: 'report',
            requested_at: new Date()
        };

        channel.sendToQueue(
            config.rabbitmqQueue,
            Buffer.from(JSON.stringify(payload)),
            { persistent: true }
        );

        return { message: 'Generación de reporte programada' };
    }
}

module.exports = TasksService;
