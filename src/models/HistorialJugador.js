const { Sequelize, Model, DataTypes } = require('sequelize');
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
    id_jugador: {
        type: DataTypes.INTEGER,
    },
    fecha_registro: {
        type: DataTypes.DATE
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
    modelName: 'Jugador',
    tableName: 'jugadores'
});

module.exports = HistorialJugador;