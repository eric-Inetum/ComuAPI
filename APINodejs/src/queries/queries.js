
const getJugadores = (where) => { return `SELECT * FROM jugadores ${where}` };
const getJugadorByID = `SELECT * FROM jugadores WHERE id_jugador = $1`;
const getHistorialByID = `SELECT * FROM historial_jugadores WHERE id_jugador = $1 ORDER BY id_historial_jugador DESC`;
const getJugadoresByDia = (where) => { return `SELECT * FROM historial_jugadores WHERE fecha_registro = $1 ${where}` };

const patchJugador = "UPDATE jugadores SET propietario = $1, equipo = $2, posicion = $3, titular = $4, partidos_jugados = $5, ranking_general = $6, mejor_fichaje = $7, media_sofascore = $8, media_puntos = $9, total_puntos = $10, puntos_buenos = $11, oferta_minima = $12, valor_mercado = $13, valor_mercado_max = $14, valor_mercado_min = $15, ranking_equipo = $16, ranking_posicion = $17, tarjeta_amarilla = $18, tarjeta_roja = $19, doble_tarjeta_amarilla = $20, racha = $21, lesion = $22 WHERE id_jugador = $23";
const postJugador = "INSERT INTO jugadores (id_jugador, nombre, propietario, equipo, posicion, titular, partidos_jugados, ranking_general, ranking_equipo, ranking_posicion, media_sofascore, media_puntos, total_puntos, valor_mercado, valor_mercado_max, valor_mercado_min, tarjeta_amarilla, tarjeta_roja, doble_tarjeta_amarilla, racha, lesion) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22)";
const postJugadores = "INSERT INTO jugadores (id_jugador, nombre, propietario, equipo, posicion, titular, partidos_jugados, ranking_general, ranking_equipo, ranking_posicion, mejor_fichaje, media_sofascore, media_puntos, total_puntos, puntos_buenos, oferta_minima, valor_mercado, valor_mercado_max, valor_mercado_min, tarjeta_amarilla, tarjeta_roja, doble_tarjeta_amarilla, racha, lesion) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22);"
const insertHistorial = "INSERT INTO historial_jugadores (id_jugador, nombre, fecha_registro, equipo, posicion, titular, partidos_jugados, ranking_general, ranking_equipo, ranking_posicion, media_sofascore, media_puntos, total_puntos, valor_mercado, tarjeta_amarilla, tarjeta_roja, doble_tarjeta_amarilla, racha) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18);";

function constructWhereStatement(query) {
    where = "WHERE ";
    for (const key in query) {
        if (query[key] == "null") {
            where += key + " IS NULL";
        } else if (query[key] == "notNull") {
            where += key + " IS NOT NULL";
        } else if (query[key].substring(0, 10) == "lowerThan_") {
            where += key + " < '" + query[key].substring(10, query[key].length) + "'";
        } else if (query[key].substring(0, 12) == "greaterThan_") {
            where += key + " > '" + query[key].substring(12, query[key].length) + "'";
        } else {
            where += key + " = '" + query[key] + "'";
        }
        where += " AND ";
    }
    where = where.substring(0, where.length - 5);
    return where;
}

module.exports = {
    constructWhereStatement,
    getJugadores,
    getJugadorByID,
    getJugadoresByDia,
    getHistorialByID,
    patchJugador,
    postJugador,
    insertHistorial,
    postJugadores
};