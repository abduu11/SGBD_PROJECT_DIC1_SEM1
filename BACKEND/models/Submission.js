const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Submission = sequelize.define('Submission', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    fichier_pdf: { type: DataTypes.STRING, allowNull: false},
    date_soumission: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW},
    id_etudiant: { type: DataTypes.INTEGER, allowNull: false},
    id_examen: { type: DataTypes.INTEGER, allowNull: false},
}, {
    tableName: 'Copie',
    timestamps: true,
});

module.exports = Submission;