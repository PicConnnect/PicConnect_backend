require("dotenv").config();
const { Sequelize } = require("sequelize");

console.log(process.env.POSTGRES_URL);
//connect with the database
const db = new Sequelize(process.env.POSTGRES_URL, {
  logging: false,
  dialectModule: require("pg"),
});

module.exports = db;
