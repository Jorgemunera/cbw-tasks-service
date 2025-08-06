require("dotenv").config();

const config = {
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGO_URI,
    rabbitmqUri: process.env.RABBITMQ_URI,
    rabbitmqQueue: process.env.RABBITMQ_QUEUE
}

module.exports = {
    config
}
