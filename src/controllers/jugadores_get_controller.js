const sequelize = require("../database/dbconfig");
const Jugadores = require("../models/Jugador");
const { Op } = require("sequelize");

async function getJugadores(req, res, next) {
    let whereClause = {};
    let orderClause = ['id_jugador', 'DESC'];
    let offsetValue = 0;

    const query = req.query;
    if (Object.keys(query).length > 0) {
        for (const key in query) {
            if (key == "orderAscBy") {
                orderClause = [query[key], 'ASC'];
            } else if (key == "orderDescBy") {
                orderClause = [query[key], 'DESC'];

            } else if (key == "pag") {
                if (query[key] <= 0) {
                    offsetValue = 0;
                } else {
                    offsetValue = (query[key] - 1) * 8;
                }

            } else {
                if (key != "id_jugador" && Jugadores.hasOwnProperty(key)) {
                    whereClause += {
                        key: query,
                    };
                }
                if (query[key] === "null") {
                    whereClause[key] = {
                        [Op.is]: null
                    };
                } else if (query[key] === "notNull") {
                    whereClause[key] = {
                        [Op.not]: null
                    };
                } else if (query[key].startsWith("lowerThan_")) {
                    whereClause[key] = {
                        [Op.lt]: query[key]
                    };
                } else if (query[key].startsWith("greaterThan_")) {
                    whereClause[key] = {
                        [Op.gt]: query[key]
                    };
                } else {
                    whereClause[key] = {
                        [Op.eq]: query[key]
                    };
                }
            }
        }
    }
    try {
        const jugadores = await Jugadores.findAll({ 
            where: whereClause, 
            order: [orderClause], 
            limit: 8, 
            offset: offsetValue 
        });
        res.status(200).json({ jugadores });
        next();

    } catch (error) {
        console.error('Error:', error);
        next(error);
    }
}

async function getJugadorPorId(req, res, next) {
    const id_jugador = req.params.id;
    try {
        const jugador = await Jugadores.findByPk(id_jugador);

        if (jugador === null) {
            return res.status(404).json({ error: "No se ha encontrado el jugador" });
        }
        res.status(200).json({ jugador });
        next();

    } catch (error) {
        console.error('Error:', error);
        next(error);
    }
}

module.exports = {
    getJugadores,
    getJugadorPorId
}