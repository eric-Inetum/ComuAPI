const Jugadores = require("../models/Jugador");
const { Op } = require("sequelize");

async function getJugadores(req, res, next) {
    let whereClause = {};
    const query = req.query;
    if (Object.keys(query).length > 0) {
        for (const key in query) {
            if (key == "id_jugador") {
                res.status(400).json({ error: "Criterio de busqueda incorrecto" });
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
    try {
        const jugadores = await Jugadores.findAll({ where: whereClause });
        res.status(200).json({ jugadores });
        next();

    } catch (error) {
        console.error('Error:', error);
        next(error);
    }
}

async function getJugadorOrdered(req, res, next) {
    const campo = req.params.campo;
    try {
        const jugador = await Jugadores.findAll({
            order: [campo, 'DESC']
        });

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

async function updateOrCreate(req, res, next) {
    const datos = req.body;
    const id_jugador = datos.id_jugador;

    try {
        let jugador = await Jugadores.findByPk(id_jugador);

        if (jugador === null) {
            jugador = await Jugadores.create(datos);
            next();

        } else {
            jugador = await jugador.update(datos);
        }
        res.status(200).json({ jugador });

    } catch (error) {
        console.error('Error:', error);
        next(error);
    }
}

module.exports = {
    getJugadores,
    getJugadorOrdered,
    getJugadorPorId,
    updateOrCreate
}