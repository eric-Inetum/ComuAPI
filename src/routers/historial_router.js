const router = require('express').Router();

const controller = require('../controllers/historial_get_controller');

/**
 * @openapi
 * /api/v2/historialJugadores/{id}:
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
 *     responses:
 *       200:
 *         description: Lista de registros por día del jugador.
 *       500:
 *         description: Internal server error.
 */
router.get('/:id', controller.getHistorialByID);

/**
 * @openapi
 * /api/v2/historialJugadores/fecha/{fecha}:
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
 *     responses:
 *       200:
 *         description: Lista de registros por día del jugador.
 *       500:
 *         description: Internal server error.
 */
// router.get("/fecha/:fecha", controller.getHistorialByDia);

/**
 * @openapi
 * /api/v2/historialJugadores:
 *   post:
 *     security:
 *     - BearerAuth: []
 *     tags:
 *     - "Gestion de jugadores"
 *     summary: Inserta todos los jugadores en la tabla de historial de la base de datos.
 *     description: Al hacer una llamada a este POST se hace una pre-request interna para obtener todos los datos de los jugadores y posteriormente insertarlos. Debido a esto no es necesario indicar un body desde el swagger.
 *     responses:
 *       '201':
 *         description: Registro guardado con exito
 *       '400':
 *         description: Bad request. Error en la solicitud.
 *       '500':
 *         description: Error interno del servidor.
 *       default:
 *         description: Error no especificado
 */

module.exports = router;