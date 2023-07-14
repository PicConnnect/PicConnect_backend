const { DataTypes } = require("sequelize");
const db = require("../db");

const User = db.define("user", {
    userID: {
        type: DataTypes.STRING,
        primaryKey: true
    }, 
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    about: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
});

module.exports = User;