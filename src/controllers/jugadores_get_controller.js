const Jugadores = require("../models/Jugador")

async function getJugadores(req, res, next) {
    //Anyadir custom WHERE
    try {
        const jugadores = await Jugadores.findAllCustom();
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
        const jugadores = await Jugadores.findOneCustom({where: {id_jugador}});

        if (!jugadores) {
            return res.status(404).json({ error: "No se ha encontrado el jugador" });
        }
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