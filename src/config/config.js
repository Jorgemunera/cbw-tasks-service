require("dotenv").config();

const config = {
    env: process.env.NODE_ENV || "development",
    port: process.env.PORT || 3000,
    mongoUri: process.env.MONGO_URI
}

module.exports = {
    config
}
