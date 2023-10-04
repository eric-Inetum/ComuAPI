const db = require("../db_config/db.js");
const queries = require('../queries/queries.js');
const client = db.getClientForPrueba();
client.connect();

//Funcion para obtener los registros de todas las fechas del historial a traves del id del jugador
const getHistorialByID = (req, res) => {
    const id = req.params.id;
    const values = [id];
    client.query(queries.getHistorialByID, values, (error, results) => {
        if (error) {
            console.error("Error executing MySQL query:", error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        const jugadores = results.rows;
        jugadores.forEach(jugador => {
            jugador.fecha_registro = jugador.fecha_registro.toISOString().substring(0, 10);
        })

        res.status(200).json({ jugadores });
    });
};

const getHistorialByDia = (req, res) => {
    const fecha = req.params.fecha.split("-");
    let year = parseInt(fecha[0])
    let month = parseInt(fecha[1])
    let day = parseInt(fecha[2])
    if (day > 0){
        res.status(400)
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

    let query = req.query;
    let where = "";
    if (Object.keys(query).length > 0) {
        where = queries.constructWhereStatement(query);
        where = " AND" + where.substring(5, where.length);
        if (where.includes("id_jugador")){
            res.status(400).json({error: "Criterio de busqueda incorrecto"})
        }
    }
    const values = [formattedDate];
    client.query(queries.getJugadoresByDia(where), values, (error, results) => {
        if (error) {
            console.error("Error executing PostgreSQL query:", error);
            res.status(500).json({ error: "Error interno del servidor" });
            return;
        }
        const jugadores = results.rows;
        jugadores.forEach(jugador => {
            jugador.fecha_registro = jugador.fecha_registro.toISOString().substring(0, 10);
        })

        res.status(200).json({ jugadores });
    });
};

module.exports = {
    getHistorialByID,
    getHistorialByDia
}