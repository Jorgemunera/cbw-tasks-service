require("dotenv").config();

const config = {
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGO_URI,
    rabbitmqUri: process.env.RABBITMQ_URI,
    rabbitmqQueue: process.env.RABBITMQ_QUEUE,
    rabbitMaxRetries: process.env.MAX_RETRIES || 10,
    rabbitRetryDelayMs: process.env.RETRY_DELAY_MS || 3000
}

module.exports = {
    config
}
