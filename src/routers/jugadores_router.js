const router = require('express').Router();

const controller = require('../controllers/jugadores_get_controller');
/**
 * @openapi
 * /api/v2/jugadores:
 *   get:
 *     tags:
 *       - "Jugadores"
 *     summary: Devuelve todos los jugadores de comunio y comuniate.
 *     description: Devuelve una lista con todos los jugadores de comunio y comuniate. Si se añaden parámetros, puede devolver 1 o muchos jugadores.
 *     parameters:
 *       - name: nombre
 *         in: query
 *         description: Filtrar por nombre del jugador.
 *         required: false
 *       - name: propietario
 *         in: query
 *         description: Filtrar por propietario actual del jugador.
 *         required: false
 *         schema:
 *           type: string
 *       - name: equipo
 *         in: query
 *         description: Filtrar por equipo actual del jugador.
 *         required: false
 *         schema:
 *           type: string
 *       - name: posicion
 *         in: query
 *         description: Filtrar por posicion del jugador.
 *         required: false
 *         schema:
 *           type: string
 *       - name: titular
 *         in: query
 *         description: Filtrar por titularidad.
 *         required: false
 *         schema:
 *           type: boolean
 *       - name: ranking_general
 *         in: query
 *         description: Filtrar por posicion en el ranking general del jugador.
 *         required: false
 *         schema:
 *           type: integer
 *       - name: mejor_fichaje
 *         in: query
 *         description: Filtrar por mejor fichaje del mercado actual.
 *         required: false
 *         schema:
 *           type: boolean
 *       - name: oferta_minima
 *         in: query
 *         description: Filtrar por la oferta minima del jugador (En el caso de querer buscar jugadores con oferta por encima o por debajo de una cifra concreta, usar greaterThan_cifra y lowerThan_cifra respectivamente).
 *         required: false
 *         schema:
 *           type: string
 *       - name: valor_mercado
 *         in: query
 *         description: Filtrar por el valor de mercado del jugador (En el caso de querer buscar jugadores con valor de mercado por encima o por debajo de una cifra concreta, usar greaterThan_cifra y lowerThan_cifra respectivamente).
 *         required: false
 *         schema:
 *           type: string
 *       - name: valor_mercado_max
 *         in: query
 *         description: Filtrar por el valor de mercado de maximo del jugador (En el caso de querer buscar jugadores con valor de mercado maximo por encima o por debajo de una cifra concreta, usar greaterThan_cifra y lowerThan_cifra respectivamente).
 *         required: false
 *         schema:
 *           type: string
 *       - name: valor_mercado_min
 *         in: query
 *         description: Filtrar por el valor de mercado minimo del jugador (En el caso de querer buscar jugadores con valor de mercado minimo por encima o por debajo de una cifra concreta, usar greaterThan_cifra y lowerThan_cifra respectivamente).
 *         required: false
 *         schema:
 *           type: string
 *       - name: ranking_equipo
 *         in: query
 *         description: Filtrar por posicion en el ranking equipo del jugador.
 *         required: false
 *         schema:
 *           type: integer
 *       - name: ranking_posicion
 *         in: query
 *         description: Filtrar por posicion en el ranking de la posicion del jugador.
 *         required: false
 *         schema:
 *           type: integer
 *       - name: racha
 *         in: query
 *         description: Filtrar por la racha actual del jugador.
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista los jugadores.
 *       500:
 *         description: Internal server error.
 *       400:
 *         description: Criterio de búsqueda incorrecto.
 */
router.get("/", controller.getJugadores);

/**
 * @openapi
 * /api/v2/jugadores/{id_jugador}:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *     - "Jugadores"
 *     summary: Devuelve la informacion de un jugador..
 *     description: Devuelve la informacion de un jugador buscado por su id de jugador.
 *     parameters:
 *       - name: id_jugador
 *         in: path
 *         description: ID del jugador a buscar
 *         required: true
 *         schema: 
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista los jugadores.
 *       500:
 *         description: Internal server error.
 */
router.get("/:id", controller.getJugadorPorId);

/**
 * @openapi
 * /api/v2/jugadores:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *     - "Gestion de jugadores"
 *     summary: Crea o actualiza un jugador.
 *     description: Inserta a un jugador dentro de la base de datos si no existe, en caso contrario, actualiza el jugador. Es necesario que el id del jugador sea unico para que su inserción o actualizacion sea correcta.
 *     responses:
 *       '201':
 *         description: Registro guardado con exito
 *       '400':
 *         description: Bad request. Error en la solicitud.
 *       '500':
 *         description: Error interno del servidor.
 *       default:
 *         description: Error no especificado
 *     requestBody:
 *       required: true
 *       content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                       id_jugador:
 *                         type: integer
 *                         example: 3333
 *                       nombre:
 *                         type: string
 *                         example: "Joao Cancelo"
 *                       propietario:
 *                         type: string
 *                         example: "Computer"
 *                       equipo:
 *                         type: string
 *                         example: "Barcelona"
 *                       posicion:
 *                         type: string
 *                         example: "DF"
 *                       titular:
 *                         type: boolean
 *                         example: false
 *                       partidos_jugados:
 *                         example: "4/7"
 *                       ranking_general:
 *                         type: integer
 *                         example: 47
 *                       mejor_fichaje:
 *                         type: boolean
 *                         example: true
 *                       media_sofascore:
 *                         type: number
 *                         format: double 
 *                         example: 7.7
 *                       media_puntos:
 *                         type: number
 *                         format: double 
 *                         example: 10
 *                       total_puntos:
 *                         type: number
 *                         format: double 
 *                         example: 40
 *                       puntos_buenos:
 *                         type: integer
 *                         example: null
 *                       oferta_minima:
 *                         type: integer
 *                         example: 10340000
 *                       valor_mercado:
 *                         type: integer
 *                         example: 10280000
 *                       valor_mercado_max:
 *                         type: integer
 *                         example: 4000000
 *                       valor_mercado_min:
 *                         type: integer
 *                         example: 10630000
 *                       ranking_equipo:
 *                         type: integer
 *                         example: 6
 *                       ranking_posicion:
 *                         type: integer
 *                         example: 5
 *                       tarjeta_amarilla:
 *                         type: integer
 *                         example: 0
 *                       tarjeta_roja:
 *                         type: integer
 *                         example: 0
 *                       doble_tarjeta_amarilla:
 *                         type: integer
 *                         example: 0
 *                       racha:
 *                         type: string
 *                         example: "Buena"
 *                       lesion:
 *                         type: string
 *                         example: "NO"
 *       500:
 *         description: Internal
 */

module.exports = router;