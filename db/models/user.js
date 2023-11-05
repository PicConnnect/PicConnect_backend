const { DataTypes } = require("sequelize");
const db = require("../db");

const User = db.define("user", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    profilePicUrl: {
        type: DataTypes.STRING,
        defaultValue: 'https://cdn-icons-png.flaticon.com/512/847/847969.png?w=996&t=st=1689999078~exp=1689999678~hmac=55469eb17eccadb1b2993272870eb2de6c1d2599d0699f175b2cd518d5395bb8',
        allowNull: false,
    },
    birthday: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: true,
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