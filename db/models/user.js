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
        allowNull: true,
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        }
    }
});

module.exports = User;