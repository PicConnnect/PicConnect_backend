const { DataTypes } = require("sequelize");
const db = require("../db");

const Tag = db.define("tag", {
    tag_name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});
module.exports = Tag;