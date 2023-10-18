const router = require('express').Router();
const controller = require('../controllers/post_controller');
const controllerGet = require('../controllers/jugadores_get_controller');

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
 *         description: Página que se desea ver (se muestran 8 jugadores).
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
 *       - name: media_sofascore
 *         in: query
 *         description: Filtra por la media de valoración según la página de SofaScore.
 *         required: false
 *         schema:
 *           type: float
 * 
 *       - name: media_puntos
 *         in: query
 *         description: Filtra por la media de puntos por partido del jugador.
 *         required: false
 *         schema:
 *           type: integer
 * 
 *       - name: total_puntos
 *         in: query
 *         description: Filtra por la cantidad total de puntos que ha hecho un jugador.
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
 *         description: Filtra por la oferta minima del jugador.<br>
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
router.get("/", controllerGet.getJugadores);

/**
 * @openapi
 * /api/v3/jugadores/{id}:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *     - "Jugadores"
 *     summary: Devuelve la información del jugador con esa ID.
 *     description: Devuelve la información del jugador que coincida su ID con el introducido.
 * 
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID del jugador.
 *         required: true
 *         schema:
 *           type: integer
 * 
 *     responses:
 *       200:
 *         description: Información del jugador.
 *       500:
 *         description: Error interno del servidor.
 *       400:
 *         description: Criterio de búsqueda incorrecto.
 */
router.get("/:id", controllerGet.getJugadorPorId);

/**
 * @openapi
 * /api/v3/jugadores:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *     - "Gestión de jugadores"
 *     summary: Crea o guarda y actualiza un jugador.
 *     description: Inserta a un jugador dentro de la base de datos si no existe, en caso contrario, guarda el jugador en el historial y lo actualiza. Es necesario que el id del jugador sea unico para que su gestion sea correcta.
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
router.post('/', controller.postJugador);


module.exports = router;