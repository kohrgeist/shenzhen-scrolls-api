const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize('shenzhen_scrolls', 'root', process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql',
    logging: false // Deixa o terminal limpo
});

module.exports = sequelize;