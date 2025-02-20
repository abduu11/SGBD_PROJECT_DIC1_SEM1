const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    nom: { type: DataTypes.STRING },
    prenom: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    mot_de_passe: { type: DataTypes.STRING },
    role: { type: DataTypes.ENUM("etudiant", "enseignant") },
    date_inscriptionda: { type: DataTypes.DATE, defaultValue: DataTypes.NOW},
}, {
    tableName: "Utilisateur",
    timestamps: false,
});

module.exports = User;