require("dotenv").config();
const { Sequelize } = require("sequelize");

console.log(process.env.POSTGRES_URL);
// Connect with the database
const db = new Sequelize(process.env.POSTGRES_URL, {
  logging: false,
  dialectModule: require("pg"),
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false 
    }
  }
});

module.exports = db;
