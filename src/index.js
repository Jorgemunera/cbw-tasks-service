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

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const swaggerDocument = YAML.load(path.join(__dirname, './docs/swagger.yaml'));


// app
const app = express();
const port = config.port;

// natives middlewares
app.use(express.json());
app.use(cors());

// routes
routerApi(app);

// Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

