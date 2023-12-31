const {DataTypes} = require("sequelize");
const db = require("../db");

const Camera_Details = db.define("camera_details",{
    make: {
        type: DataTypes.STRING,
        allowNull: false
    },
    model: {
        type: DataTypes.STRING,
        allowNull: false
    },
    exposure_time:{
        type: DataTypes.STRING,
        allowNull: false
    },
    aperture:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    focal_length:{
        type: DataTypes.STRING,
        allowNull: false
    },
    iso:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
});
module.exports = Camera_Details;