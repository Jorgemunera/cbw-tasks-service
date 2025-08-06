const amqp = require('amqplib');
const { config } = require('../config/config');

let channel;
let connection;

async function connectRabbitMQ() {
    try {
        connection = await amqp.connect(config.rabbitmqUri);
        channel = await connection.createChannel();

        // Asegurar que la cola existe y es durable
        await channel.assertQueue(config.rabbitmqQueue, {
            durable: true
        });

        console.log('✅ Conectado a RabbitMQ');
    } catch (error) {
        console.error('❌ Error al conectar a RabbitMQ:', error);
        process.exit(1);
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
