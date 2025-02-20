const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Etudiant = sequelize.define("Etudiant", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: User,
            key: 'id'
        }
    },
}, {
    tableName: "Etudiant",
    timestamps: false,
});

User.hasOne(Etudiant, { foreignKey: 'id' });
Etudiant.belongsTo(User, { foreignKey: 'id' });

module.exports = Etudiant;