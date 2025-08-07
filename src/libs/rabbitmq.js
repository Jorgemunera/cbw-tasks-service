const amqp = require('amqplib');
const { config } = require('../config/config');

let channel;
let connection;


async function connectRabbitMQ() {
    let attempts = 0;

    while (attempts < config.rabbitMaxRetries) {
        try {
            connection = await amqp.connect(config.rabbitmqUri);
            channel = await connection.createChannel();

            await channel.assertQueue(config.rabbitmqQueue, {
                durable: true
            });

            console.log('✅ Conectado a RabbitMQ');
            return;
        } catch (error) {
            attempts++;
            console.error(`❌ Intento ${attempts} de conexión a RabbitMQ fallido:`, error.message);

            if (attempts >= config.rabbitMaxRetries) {
                console.error('💀 No se pudo conectar a RabbitMQ después de varios intentos. Abortando...');
                process.exit(1);
            }

            await new Promise(resolve => setTimeout(resolve, config.rabbitRetryDelayMs));
        }
    }
}

function getChannel() {
    if (!channel) {
        throw new Error('RabbitMQ channel no inicializado');
    }
    return channel;
}

module.exports = {
    connectRabbitMQ,
    getChannel
};
