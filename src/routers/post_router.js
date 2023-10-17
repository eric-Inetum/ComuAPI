const router = require('express').Router();
const controller = require('../controllers/post_controller');

/**
 * @openapi
 * /api/v2/jugadores:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *     - "Gestion de jugadores"
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
router.post('/jugador', controller.postJugador);

module.exports = router;