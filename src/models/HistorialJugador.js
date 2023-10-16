const { Sequelize, Model, DataTypes } = require('sequelize');
const path = require('path');
const Jugador = require('./Jugador');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

//Get que devuelve el cliente de la bd de pruebas
const sequelize = new Sequelize(
    process.env.DB_DATABASE_PROD,
    process.env.DB_USER_POST,
    process.env.DB_PASSWORD_POST,
    {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        logging: false,
        port: process.env.DB_PORT
    }
);

class HistorialJugador extends Model {
}

HistorialJugador.init({
    id_historial_jugador: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fecha_registro: {
        type: DataTypes.DATE
    },
    nombre: {
        type: DataTypes.STRING
    },
    equipo: {
        type: DataTypes.STRING
    },
    posicion: {
        type: DataTypes.STRING
    },
    titular: {
        type: DataTypes.BOOLEAN
    },
    partidos_jugados: {
        type: DataTypes.STRING
    },
    ranking_general: {
        type: DataTypes.INTEGER
    },
    media_sofascore: {
        type: DataTypes.FLOAT
    },
    media_puntos: {
        type: DataTypes.FLOAT
    },
    total_puntos: {
        type: DataTypes.INTEGER
    },
    valor_mercado: {
        type: DataTypes.INTEGER
    },
    ranking_equipo: {
        type: DataTypes.INTEGER
    },
    ranking_posicion: {
        type: DataTypes.INTEGER
    },
    tarjeta_amarilla: {
        type: DataTypes.INTEGER
    },
    tarjeta_roja: {
        type: DataTypes.INTEGER
    },
    doble_tarjeta_amarilla: {
        type: DataTypes.INTEGER
    },
    racha: {
        type: DataTypes.STRING
    },
}, {
    sequelize,
    modelName: 'HistorialJugador',
    tableName: 'historial_jugadores',
    timestamps: false
});

module.exports = HistorialJugador;