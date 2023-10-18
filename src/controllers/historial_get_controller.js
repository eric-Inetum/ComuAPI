const HistorialJugadores = require("../models/HistorialJugador")
const Jugadores = require("../models/Jugador")
const { Op } = require("sequelize");


async function getHistorialByDia(req, res, next) {
    let offsetValue = 0;
    let orderClause = ['id_jugador', 'DESC'];

    let whereClause = {};
    const fecha = req.params.fecha.split("-");
    let year = parseInt(fecha[0])
    let month = parseInt(fecha[1])
    let day = parseInt(fecha[2])
    if (year.length > 4 || month.length > 2 || day.length > 2 || day <= 0 || month <= 0 || year <= 0) {
        res.status(400).json({ error: "Criterio de busqueda incorrecto" });
    }
    day++;
    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
        if (day > 31) {
            day = 1;
            month++;
        }
    } else if (month == 2) {
        if (year % 4 == 0) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    } else {
        if (day > 30) {
            day = 1;
            month++;
        }
    }
    if (month > 12) {
        month = 1;
        year++;
    }
    let formattedDate = year + "-";
    if (month < 10) formattedDate += "0";
    formattedDate += month + "-";
    if (day < 10) formattedDate += "0";
    formattedDate += day;
    whereClause.fecha_registro = {
        [Op.eq]: formattedDate
    };
    const query = req.query;
    if (Object.keys(query).length > 0) {
        for (const key in query) {
            if (key == "id_jugador") {
                res.status(400).json({ error: "Criterio de busqueda incorrecto" });
            }
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
        const historialJugadores = await HistorialJugadores.findAll({
            where: whereClause,
            order: [orderClause],
            limit: 8,
            offset: offsetValue
        });
        res.status(200).json({ historialJugadores });
        next();

    } catch (error) {
        console.error('Error:', error);
        next(error);
    }
}

async function getHistorialByID(req, res, next) {
    const id = req.params.id;
    let whereClause = {};
    let offsetValue = 0;

    const query = req.query;
    whereClause['id_jugador'] = {
        [Op.eq]: id
    };
    if (Object.keys(query).length > 0) {
        for (const key in query) {
            if (key == "pag") {
                offsetValue = (query[key] - 1) * 8;

            } else {
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
                } else if (key == "fecha_registro") {
                    whereClause[key] = {
                        [Op.eq]: getDate(query[key])
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
        const historialJugadores = await HistorialJugadores.findAll({
            where: whereClause,
            limit: 8,
            offset: offsetValue
        }, { include: Jugadores });
        res.status(200).json({ historialJugadores });
        next();

    } catch (error) {
        console.error('Error:', error);
        next(error);
    }
}

function getDate(req) {
    const fecha = req.split("-");
    let year = parseInt(fecha[0])
    let month = parseInt(fecha[1])
    let day = parseInt(fecha[2])
    if (year.length > 4 || month.length > 2 || day.length > 2 || day <= 0 || month <= 0 || year <= 0) {
        res.status(400).json({ error: "Criterio de busqueda incorrecto" });
    }
    day++;
    if (month == 1 || month == 3 || month == 5 || month == 7 || month == 8 || month == 10 || month == 12) {
        if (day > 31) {
            day = 1;
            month++;
        }
    } else if (month == 2) {
        if (year % 4 == 0) {
            if (day > 29) {
                day = 1;
                month++;
            }
        } else {
            if (day > 28) {
                day = 1;
                month++;
            }
        }
    } else {
        if (day > 30) {
            day = 1;
            month++;
        }
    }
    if (month > 12) {
        month = 1;
        year++;
    }
    let formattedDate = year + "-";
    if (month < 10) formattedDate += "0";
    formattedDate += month + "-";
    if (day < 10) formattedDate += "0";
    formattedDate += day;

    return formattedDate;
}

module.exports = {
    getHistorialByID,
    getHistorialByDia
}