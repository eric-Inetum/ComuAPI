const sequelize = require("../database/dbconfig");
const Jugadores = require("../models/Jugador");
const HistorialJugadores = require("../models/HistorialJugador")

async function postJugador(req, res, next) {
    const datos = req.body;
    const id = datos.id_jugador;

    try {
        let jugador = await Jugadores.findByPk(id);

        if (jugador === null) {
            jugador = await Jugadores.create(datos);
            res.status(200).json("Jugador creado");
            next();

        } else {
            const date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();

            let formattedDate = year + "-";
            if (month < 10) formattedDate += "0";
            formattedDate += month + "-";
            if (day < 10) formattedDate += "0";
            formattedDate += day;

            if (await HistorialJugadores.findOne({ where: { id_jugador: id, fecha_registro: formattedDate } }) == null) {
                const body = jugador.dataValues;
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
                await HistorialJugadores.create(values, { include: Jugadores });
            }

            jugador = await jugador.update(datos);
            res.status(200).json("Jugador actualizado");
        }


    } catch (error) {
        console.error('Error:', error);
        next(error);
    }
}

module.exports = {
    postJugador
}