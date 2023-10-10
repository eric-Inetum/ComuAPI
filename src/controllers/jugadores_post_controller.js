const Jugadores = require("../models/Jugador");

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


module.exports = updateOrCreate;