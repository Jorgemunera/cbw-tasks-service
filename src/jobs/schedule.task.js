const { Task } = require("../db/models/tasks.model");

async function handleScheduledTask(taskPayload) {
    const taskId = taskPayload.id;

    try {
        const task = await Task.findById(taskId);

        if (!task) {
            console.warn(`⚠️ Tarea no encontrada: ${taskId}`);
            return;
        }

        if (task.status !== 'pending') {
            console.warn(`⚠️ Tarea ${taskId} no está pendiente, se ignora.`);
            return;
        }

        console.log(`🚀 Procesando tarea "${task.title}" (${task._id})...`);

        // Cambiar a in-progress
        task.status = 'in-progress';
        await task.save();

        // Simula trabajo de 30s
        await new Promise(resolve => setTimeout(resolve, 30000));

        // Cambiar a completed
        task.status = 'completed';
        await task.save();

        console.log(`✅ Tarea "${task.title}" completada.`);
    } catch (error) {
        console.error("❌ Error procesando tarea:", error);
    }
}

module.exports = { handleScheduledTask };
