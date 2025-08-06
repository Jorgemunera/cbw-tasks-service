const mongoose = require("mongoose");
const { config } = require("../config/config");

async function connectMongo() {
    try {
        await mongoose.connect(config.mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log("✅ Conectado a MongoDB");
    } catch (error) {
        console.error("❌ Error al conectar a MongoDB:", error);
        process.exit(1);
    }

    mongoose.connection.on("disconnected", () => {
        console.warn("⚠️ MongoDB desconectado");
    });

    mongoose.connection.on("error", err => {
        console.error("❌ Error en la conexión de MongoDB:", err);
    });
}

module.exports = connectMongo;
