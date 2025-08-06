const express = require("express");
const cors = require("cors");
const connectMongo = require("./libs/mongodb");
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
app.use(obmErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

// connect to MongoDB
connectMongo();

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

