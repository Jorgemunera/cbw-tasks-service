const { config } = require('./config/config');
const { connectRabbitMQ, getChannel } = require('./libs/rabbitmq');
const connectMongo = require('./libs/mongodb');
const { handleScheduledTask } = require('./jobs/schedule.task');
const { checkTasksCloseToDueDate } = require('./jobs/notify.due.tasks');
const { generateCompletedTasksReport } = require('./jobs/generate.report');


async function startWorker() {
    await connectMongo();
    await connectRabbitMQ();

    const channel = getChannel();

    await channel.consume(
        config.rabbitmqQueue,
        async (msg) => {
            if (msg !== null) {
                try {
                    const content = JSON.parse(msg.content.toString());
                    const type = content.type || 'task';

                    if (type === 'task') {
                        console.log('👂 Recibido mensaje de tarea:', content);
                        await handleScheduledTask(content);
                    } else if (type === 'report') {
                        console.log('📥 Recibido mensaje de reporte.');
                        await generateCompletedTasksReport();
                    } else {
                        console.warn(`⚠️ Tipo de mensaje no reconocido: ${type}`);
                    }

                    channel.ack(msg);
                } catch (error) {
                    console.error('❌ Error procesando mensaje:', error);
                }
            }
        },
        { noAck: false }
    );

    console.log('👷 Worker escuchando la cola...');

    // Job de notificación
    setInterval(() => {
        console.log('⏱️ Verificando tareas próximas a vencer...');
        checkTasksCloseToDueDate();
    }, 2 * 60 * 1000);
}

startWorker();
