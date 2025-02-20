const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");

const Enseignant = sequelize.define("Enseignant", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: User,
            key: 'id'
        }
    },
}, {
    tableName: "Enseignant",
    timestamps: false,
});

User.hasOne(Enseignant, { foreignKey: 'id' });
Enseignant.belongsTo(User, { foreignKey: 'id' });

module.exports = Enseignant;