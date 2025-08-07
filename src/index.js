const express = require("express");
const cors = require("cors");
const connectMongo = require("./libs/mongodb");
const { connectRabbitMQ } = require('./libs/rabbitmq');
const { config } = require("./config/config");
const routerApi = require("./routes");
const {
    logErrors,
    obmErrorHandler,
    boomErrorHandler,
    errorHandler
} = require("./middlewares/error.handler");

// app
const app = express();
const port = config.port;

// natives middlewares
app.use(express.json());
app.use(cors());

// routes
routerApi(app);

// middlewares
app.use(logErrors);
app.use(boomErrorHandler);
app.use(obmErrorHandler);
app.use(errorHandler);

// connect to MongoDB and RabbitMQ
connectMongo();
connectRabbitMQ();


app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

