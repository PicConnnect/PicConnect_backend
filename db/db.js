//import 'dotenv/config'
const { Sequelize } = require("sequelize");
const { name } = require("../package.json");

console.log(process.env.POSTGRES_URL+`${name}`)
//connect with the database
const db = new Sequelize(process.env.POSTGRES_URL+`${name}`, {
    logging: false
});

module.exports = db;