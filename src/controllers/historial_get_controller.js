const HistorialJugadores = require("../models/HistorialJugador")
const { Op } = require("sequelize");


async function getHistorialByDia(req, res, next) {
    let whereClause = {};
    const fecha = req.params.fecha.split("-");
    let year = parseInt(fecha[0])
    let month = parseInt(fecha[1])
    let day = parseInt(fecha[2])
    if(year.length > 4 || month.length > 2 || day.length > 2 || day <= 0 || month <= 0 || year <= 0){
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
        const historialJugadores = await HistorialJugadores.findAll({where: whereClause});
        res.status(200).json({ historialJugadores });
        next();

    } catch (error) {
        console.error('Error:', error);
        next(error);
    }
}

async function getHistorialByID(req, res, next) {
    const id = req.params.id;
    try {
        const historialJugadores = await HistorialJugadores.findAll({where: {id_jugador: {[Op.eq]: id}}});
        res.status(200).json({ historialJugadores });
        next();

    } catch (error) {
        console.error('Error:', error);
        next(error);
    }
}

module.exports = {
    getHistorialByDia,
    getHistorialByID
}