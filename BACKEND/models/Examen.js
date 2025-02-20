const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Examen = sequelize.define("Examen", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    titre: { type: DataTypes.STRING, allowNull: false },
    filePath: { type: DataTypes.STRING, allowNull: false},
    id_enseignant: { type: DataTypes.INTEGER, allowNull: false},
    description: { type: DataTypes.STRING, allowNull: false},
    date_creation: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW}
}, {
    tableName: "Examen",
    timestamps: true,
});

module.exports = Examen;