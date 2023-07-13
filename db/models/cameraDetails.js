const {DataTypes} = require("sequelize");
const db = require("../db");

const Camera_Details = db.define("CameraDetails",{
    make: {
        type: DataTypes.STRING,
        allowNull: false
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    exosure_time:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    aperture:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    focal_length:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    iso:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
});
module.exports = Camera_Details;