const { Task } = require("../db/models/tasks.model");

async function generateCompletedTasksReport() {
    console.log("📊 Iniciando generación de reporte de tareas completadas...");

    // Simula proceso de 3 minutos
    await new Promise(resolve => setTimeout(resolve, 3 * 60 * 1000));

    try {
        const completedTasks = await Task.find({ status: "completed" });

        console.log(`✅ Reporte generado: ${completedTasks.length} tareas completadas encontradas.`);

        if (completedTasks.length > 0) {
            completedTasks.forEach(task => {
                console.log(`📌 - ${task.title} (ID: ${task._id})`);
            });
        }

    } catch (error) {
        console.error("❌ Error al generar el reporte:", error);
    }
}

module.exports = { generateCompletedTasksReport };
