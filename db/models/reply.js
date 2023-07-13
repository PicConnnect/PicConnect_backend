const { DataTypes } = require("sequelize");
const db = require("../db");

const Reply = db.define("reply", {
    reply_text: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Reply;