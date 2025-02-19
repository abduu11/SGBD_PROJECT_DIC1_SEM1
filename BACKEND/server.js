require("dotenv").config({ path: "./config.env" });

const express = require("express");
const cors = require("cors");
const sequelize = require('./config/database');

const app = express();
app.use(cors());
app.use(express.json());

sequelize.sync().then(() => console.log("Base de donnees synchronisee"));

app.get('/', (req, res) => {
    res.send('Serveur Operationnelle !!!');
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Serveur demarre sur le port ${PORT}`);
});