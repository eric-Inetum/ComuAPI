const HistorialJugadores = require("../models/HistorialJugador")

async function getHistorialByDia(req, res, next) {
    //Anyadir custom WHERE
    try {
        const jugadores = await Jugadores.findAll();
        res.status(200).json({ jugadores });
        next();

    } catch (error) {
        console.error('Error:', error);
        next(error);
    }
}

async function getHistorialByID(req, res, next) {
    const id_jugador = req.params.id;
    //Anyadir limit
    try {
        const HistorialJugadores = await HistorialJugadores.findOne({where: {id}});
        res.status(200).json({ jugadores });
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