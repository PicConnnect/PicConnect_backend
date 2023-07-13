const { DataTypes } = require("sequelize");
const db = require("../db");

const Photo = db.define("photo", {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    downloads: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    urls: {
        type: DataTypes.STRING,
        allowNull: false
    }
    /*
    likes from like
    likes_by_user from like
    camera_details_id from camera-details
    location_id from location
    user_id from user
    */
});

module.exports = Photo;