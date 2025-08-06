const { connectRabbitMQ, getChannel } = require('./libs/rabbitmq');
const { config } = require('./config/config');
const { handleScheduledTask } = require('./jobs/schedule.task');

async function startWorker() {
    await connectRabbitMQ();
    const channel = getChannel();

    await channel.consume(
        config.rabbitmqQueue,
        async (msg) => {
            if (msg !== null) {
                try {
                    const content = JSON.parse(msg.content.toString());

                    console.log('👂 Mensaje recibido desde la cola:', content);

                    await handleScheduledTask(content);

                    channel.ack(msg);
                } catch (error) {
                    console.error('❌ Error al procesar el mensaje:', error);
                }
            }
        },
        {
            noAck: false
        }
    );

    console.log('👷 Worker escuchando la cola...');
}

startWorker();
