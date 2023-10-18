const router = require('express').Router();

const controller = require('../controllers/historial_get_controller');

/**
 * @openapi
 * /api/v3/historialJugadores/{id}:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *     - "Historial Jugadores"
 *     summary: Devuelve el historial de un jugador buscado por su id.
 *     description: Devuelve el historial de un jugador buscado por su id.
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
 *         description: Lista de registros por día del jugador.
 *       500:
 *         description: Internal server error.
 */
router.get('/:id', controller.getHistorialByID);

/**
 * @openapi
 * /api/v3/historialJugadores/fecha/{fecha}:
 *   get:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - "Historial Jugadores"
 *     summary: Devuelve todos los registros del historial de un jugador.
 *     description: Devuelve todos los registros del historial de un jugador.
 *     parameters:
 *       - name: fecha
 *         in: path
 *         description: Fecha de creacion del registro en el historial.YYYY-MM-DD.
 *         required: true
 *         schema:
 *           type: string
 * 
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
 *       - name: valor_mercado
 *         in: query
 *         description: Filtra por el valor de mercado del jugador. Es compatible con greaterThan_ y lowerThan_.
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
 *         description: Lista de registros por día del jugador.
 *       500:
 *         description: Internal server error.
 */
 router.get("/fecha/:fecha", controller.getHistorialByDia);

module.exports = router;