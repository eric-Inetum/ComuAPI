const { Sequelize } = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

//Get que devuelve el cliente de la bd de pruebas
const sequelize = new Sequelize(
    process.env.DB_DATABASE_PRUEBA,
    process.env.DB_USER_PRUEBA,
    process.env.DB_PASSWORD_PRUEBA,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        logging: console.log,
        port: process.env.DB_PORT
    }
);

module.exports = sequelize;