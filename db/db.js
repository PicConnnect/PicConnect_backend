require('dotenv').config();
const { Sequelize } = require("sequelize");
const { name } = require("../package.json");

//connect with the database
const db = new Sequelize(process.env.POSTGRES_URL+`${name}`, {
    logging: false
});

module.exports = db;