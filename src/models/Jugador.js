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

class Jugador extends Model {
    static async findAllCustom(options = {}) {
        const modifiedOptions = {
          ...options,
          attributes: {
            exclude: ['createdAt', 'updatedAt'],
            ...options.attributes,
          },
        };
        return super.findAll(modifiedOptions);
    }

    static async findOneCustom(options = {}) {
        const modifiedOptions = {
            ...options,
            attributes: {
                exclude: ['createdAt', 'updatedAt'],
                ...options.attributes, 
            },
        };
        return super.findOne(modifiedOptions);
    }
}

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
    puntos_buenos: {
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
    }
}, {
    sequelize,
    modelName: 'Jugador',
    tableName: 'jugadores'
});

module.exports = Jugador;
