const { Model, DataTypes } = require('sequelize');
const sequelize = require('../database/dbconfig');
const HistorialJugador = require("./HistorialJugador");

class Jugador extends Model {}

Jugador.init({
    id_jugador: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    nombre: {
        type: DataTypes.STRING
    },
    propietario: {
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
    mejor_fichaje: {
        type: DataTypes.BOOLEAN
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
    oferta_minima: {
        type: DataTypes.INTEGER
    },
    valor_mercado: {
        type: DataTypes.INTEGER
    },
    valor_mercado_max: {
        type: DataTypes.INTEGER
    },
    valor_mercado_min: {
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
    lesion: {
        type: DataTypes.STRING
    },
    foto: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: 'Jugador',
    tableName: 'jugadores', 
    timestamps: false
});

Jugador.hasMany(HistorialJugador, {
    foreignKey: 'id_jugador'
});

HistorialJugador.belongsTo(Jugador, {
    foreignKey: 'id_jugador',
    onDelete: 'CASCADE'
});

module.exports = Jugador;
