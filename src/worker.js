const { config } = require('./config/config');
const { connectRabbitMQ, getChannel } = require('./libs/rabbitmq');
const connectMongo = require('./libs/mongodb');
const { jobHandlers } = require('./jobs/job.handlers');
const { checkTasksCloseToDueDate } = require('./jobs/notify.due.tasks');

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

                    const handler = jobHandlers[type];

                    if (handler) {
                        console.log(`📥 Ejecutando handler para tipo: '${type}'`);
                        await handler(content);
                    } else {
                        console.warn(`⚠️ Tipo de mensaje no reconocido: '${type}'`);
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
