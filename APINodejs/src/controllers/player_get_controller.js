const db = require("../db_config/db.js");
const queries = require('../queries/queries.js');
const client = db.getClientForGetProd();
client.connect();

// Función para obtener todos los jugadores

const getTodosJugadores = (req, res, next) => {
    let query = req.query;
    let where = "";
    if(Object.keys(query).length > 0){
        where = queries.constructWhereStatement(query);
        if (where.includes("id_jugador")){
            res.status(400).json({error: "Criterio de busqueda incorrecto"})
            return;
        }
    }
    client.query(queries.getJugadores(where), (error, results) => {
        if (error) {
            console.error('Error executing PostgreSQL query:', error);
            res.status(500).json({ error: 'No se encuentran jugadores bajo el criterio especificado' });
            return next(error);
        }
        const jugadores = results.rows;
        res.status(200).json({ jugadores });
    });
};

//Funcion para obtener campos seleccionados de un; jugador por id
const getJugadorById = (req, res) => {
    const id = req.params.id;
    const values = [id];
    client.query(queries.getJugadorByID, values, (error, results) => {
        if (error) {
            console.error('Error executing PostgreSQL query:', error);
            res.status(500).json({ error: 'No se encuentra el jugador' });
            return;
        }
        const jugador = results.rows;
        res.status(200).json({ jugador });
    });
};

module.exports = {
    getTodosJugadores,
    getJugadorById
};
