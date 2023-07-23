const { DataTypes } = require("sequelize");
const db = require("../db");

const Like = db.define("like", {
    userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users', // 'users' refers to the table name
          key: 'id',
        },
      },
      photoId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'photos', // 'photos' refers to the table name
          key: 'id',
        },
      },
    
});

module.exports = Like;
