const express = require("express");
const cors = require("cors");
const {config} = require("./config/config");

// app
const app = express();
const port = config.port;

// natives middlewares
app.use(express.json());
app.use(cors());

// routes
app.get("/", (req, res) => {
    res.json({
        message: "Welcome"
    })
})

// middlewares

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

