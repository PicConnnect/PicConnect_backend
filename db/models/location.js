const {DataTypes} = require("sequelize");
const db = require("../db");

const Location = db.define("location",{
    city:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    location_name:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    latitude:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    longitude:{
        type: DataTypes.FLOAT,
        allowNull: false
    }
});

module.exports = Location;