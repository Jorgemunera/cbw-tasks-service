async function handleScheduledTask(taskPayload) {
    console.log("📩 Procesando tarea programada...");

    // Simula una tarea larga (por ejemplo, enviar notificación o generar reporte)
    await new Promise(resolve => setTimeout(resolve, 2000));

    console.log(`✅ Tarea procesada:`, taskPayload);
}

module.exports = { handleScheduledTask };
