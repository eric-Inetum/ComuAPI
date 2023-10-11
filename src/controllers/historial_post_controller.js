const Jugadores = require("../models/Jugador");
const HistorialJugadores = require("../models/HistorialJugador");

async function insertHistorial(req, res, next) {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
   
    let formattedDate = year + "-";
    if (month < 10) formattedDate += "0";
    formattedDate += month + "-";
    if (day < 10) formattedDate += "0";
    formattedDate += day;

    try {
        const jugadores = await Jugadores.findAll();
        for (let index = 0; index < jugadores.length; index++) {
            const body = jugadores[index].dataValues;
            const values = {
                id_jugador: body.id_jugador,
                fecha_registro: formattedDate,
                nombre: body.nombre,
                equipo: body.equipo,
                posicion: body.posicion,
                titular: body.titular,
                partidos_jugados: body.partidos_jugados,
                ranking_general: body.ranking_general,
                ranking_equipo: body.ranking_equipo,
                ranking_posicion: body.ranking_posicion,
                media_sofascore: body.media_sofascore,
                media_puntos: body.media_puntos,
                total_puntos: body.total_puntos,
                valor_mercado: body.valor_mercado,
                tarjeta_amarilla: body.tarjeta_amarilla,
                tarjeta_roja: body.tarjeta_roja,
                doble_tarjeta_amarilla: body.doble_tarjeta_amarilla,
                racha: body.racha
            }
            const jugador_historial = await HistorialJugadores.create(values);
        }
        res.status(200);
        next();

    } catch (error) {
        console.error('Error:', error);
        next(error);
    }
}

module.exports = {
    insertHistorial
}