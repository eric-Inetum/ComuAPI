const router = require('express').Router();

const controller = require('../controllers/jugadores_get_controller');
/**
 * @openapi
 * /api/v3/jugadores:
 *   get:
 *     tags:
 *       - "Jugadores"
 *     summary: Devuelve una lista de jugadores de LaLiga.
 *     description: Devuelve una lista de 50 jugadores de LaLiga. Se pueden filtrar los jugadores por campos.
 *     
 *     parameters:
 *       - name: pag
 *         in: query
 *         description: Página que se desea ver (se muestran 28).
 *         required: false
 *         schema:
 *           type: integer
 * 
 *       - name: nombre
 *         in: query
 *         description: Filtra los jugadores por nombre.
 *         required: false
 * 
 *       - name: propietario
 *         in: query
 *         description: Filtra por el propietario actual del jugador.
 *         required: false
 *         schema:
 *           type: string
 * 
 *       - name: equipo
 *         in: query
 *         description: Filtra por equipo.
 *         required: false
 *         schema:
 *           type: string
 * 
 *       - name: posicion
 *         in: query
 *         description: Devuelve todos los jugadores que juegan en esa posición.
 *         required: false
 *         schema:
 *           type: string
 * 
 *       - name: titular
 *         in: query
 *         description: Filtra por jugadores que Comuniate cree que serán titulares.
 *         required: false
 *         schema:
 *           type: boolean
 * 
 *       - name: ranking_general
 *         in: query
 *         description: Filtra por la clasificación en el ranking general de puntos del jugador.
 *         required: false
 *         schema:
 *           type: integer
 * 
 *       - name: mejor_fichaje
 *         in: query
 *         description: Filtra por si es el mejor fichaje del mercado actual según Comuniate.
 *         required: false
 *         schema:
 *           type: boolean
 * 
 *       - name: oferta_minima
 *         in: query
 *         description: Filtra por la oferta minima del jugador.
 *                      En el caso de querer buscar jugadores con oferta por encima o por debajo de una cifra concreta, usar greaterThan_cifra y lowerThan_cifra respectivamente.
 *         required: false
 *         schema:
 *           type: string
 * 
 *       - name: valor_mercado
 *         in: query
 *         description: Filtra por el valor de mercado del jugador. Es compatible con greaterThan_ y lowerThan_.
 *         required: false
 *         schema:
 *           type: string
 * 
 *       - name: valor_mercado_max
 *         in: query
 *         description: Filtra por el valor de mercado de máximo del jugador.
 *                      Se puede usar greaterThan_cifra y lowerThan_cifra.
 *         required: false
 *         schema:
 *           type: string
 * 
 *       - name: valor_mercado_min
 *         in: query
 *         description: Filtra por el valor de mercado minimo del jugador.
 *                      Soporta el uso de greaterThan_cifra y lowerThan_cifra.
 *         required: false
 *         schema:
 *           type: string
 * 
 *       - name: ranking_equipo
 *         in: query
 *         description: Filtra por posicion en el ranking de equipos del jugador.
 *         required: false
 *         schema:
 *           type: integer
 * 
 *       - name: ranking_posicion
 *         in: query
 *         description: Filtra por el número en la clasificación del ranking de posiciones del jugador.
 *         required: false
 *         schema:
 *           type: integer
 * 
 *       - name: racha
 *         in: query
 *         description: Filtra por la racha actual del jugador.
 *         required: false
 *         schema:
 *           type: string
 * 
 *       - name: orderAscBy
 *         in: query
 *         description: Campo por el que ordenar ascendentemente.
 *         required: false
 *         schema:
 *           type: string
 * 
 *       - name: orderDescBy
 *         in: query
 *         description: Campo por el que ordenar descendentemente.
 *         required: false
 *         schema:
 *           type: string
 * 
 *     responses:
 *       200:
 *         description: Lista los jugadores.
 *       500:
 *         description: Error interno del servidor.
 *       400:
 *         description: Criterio de búsqueda incorrecto.
 */
router.get("/", controller.getJugadores);

/**
 * @openapi
 * /api/v2/jugadores/{id_jugador}:
 *     tags:
 *     - "Jugadores"
 *     summary: Devuelve la informacion de un jugador..
 *     description: Devuelve la informacion de un jugador buscado por su id de jugador.
 *     parameters:
 * 
 *       - name: id_jugador
 *         in: path
 *         description: ID del jugador a buscar
 *         required: true
 *         schema: 
 *           type: integer
 * 
 *     responses:
 *       200:
 *         description: Lista los jugadores.
 *       500:
 *         description: Internal server error.
 */
router.get("/:id", controller.getJugadorPorId);

module.exports = router;