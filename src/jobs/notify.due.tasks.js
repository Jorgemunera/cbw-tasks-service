const { Task } = require('../db/models/tasks.model');

async function checkTasksCloseToDueDate() {
    const now = new Date();
    const in24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    try {
        // 🔔 Tareas próximas a vencer
        const upcomingTasks = await Task.find({
            status: 'pending',
            due_date: { $gte: now, $lte: in24Hours }
        });

        // ⚠️ Tareas ya vencidas
        const overdueTasks = await Task.find({
            status: 'pending',
            due_date: { $lt: now }
        });

        if (upcomingTasks.length === 0 && overdueTasks.length === 0) {
            console.log('🔍 No hay tareas próximas a vencer ni vencidas.');
            return;
        }

        // Mostrar próximas a vencer
        upcomingTasks.forEach(task => {
            console.log(`🔔 Notificación: La tarea "${task.title}" (ID: ${task._id}) vence pronto (${task.due_date.toISOString()})`);
        });

        // Mostrar ya vencidas
        overdueTasks.forEach(task => {
            console.log(`⚠️ Tarea vencida: "${task.title}" (ID: ${task._id}) venció el ${task.due_date.toISOString()}`);
        });

    } catch (error) {
        console.error('❌ Error al verificar tareas con due_date cercano o vencidas:', error);
    }
}

module.exports = { checkTasksCloseToDueDate };
