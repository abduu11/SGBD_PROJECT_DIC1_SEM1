require("dotenv").config({ path: "./config.env" });

const express = require("express");
const cors = require("cors");
const sequelize = require('./config/database');
const User = require("./models/User");
const authRoutes = require("./routes/authRoutes");
const examRoutes = require("./routes/examRoutes");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/exams", examRoutes);
app.use("/uploads", express.static("uploads"));

sequelize.sync({ alter: true }).then(() => console.log("Base de donnees synchronisee"));

app.get('/', (req, res) => {
    res.send('Serveur Operationnelle !!!');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Serveur demarre sur le port ${PORT}`);
});