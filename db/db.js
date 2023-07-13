const { Sequelize } = require("sequelize");
const { name } = require("../package.json");

//knd = `postgres://knd:2782001knd@localhost:5434/${name}`
//connec with the database
const db = new Sequelize(`postgres://knd:2782001knd@localhost:5434/${name}`, {
    logging: false
});

module.exports = db;