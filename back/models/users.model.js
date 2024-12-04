const { DataTypes } = require("sequelize"); // J'importe les datatypes depuis Sequelize .
const sequelize = require("../configbdd/db"); // J'importe l'instance Sequelize

const User = sequelize.define(
  "User",
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    username: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "User",
    modelName: "User",
    timestamps: false,
  }
);

module.exports = User;
