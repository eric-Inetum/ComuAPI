const express = require('express');
const router = express.Router();
const jugadoresController = require('../controllers/historial_get_controller.js');

/**
 * @openapi
 * /api/v1/historialJugadores/{id}:
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               properties:
 *                 id_jugador:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 fecha_registro:
 *                   type: date
 *                 equipo:
 *                   type: string
 *                 ranking_general:
 *                   type: integer
 *                 ranking_equipo:
 *                   type: integer
 *                 ranking_posicion:
 *                   type: integer
 *                 tarjeta_amarilla:
 *                   type: integer
 *                 tarjeta_roja:
 *                   type: integer
 *                 doble_tarjeta_amarilla:
 *                   type: integer
 *                 titular:
 *                   type: boolean
 *                 mejor_fichaje:
 *                   type: boolean
 *                 media_sofascore:
 *                   type: number
 *                   format: double
 *                   example: "0.00"
 *                 media_puntos:
 *                   type: number
 *                   format: double
 *                   example: 0.00
 *                 total_puntos:
 *                   type: number
 *                   format: double
 *                   example: 0.00
 *                 puntos_buenos:
 *                   type: integer
 *                 oferta_minima:
 *                   type: integer
 *                 valor_mercado:
 *                   type: integer
 *                 propietario:
 *                   type: string
 *                 posicion:
 *                   type: string
 *                 racha:
 *                   type: string
 *                 partidos_jugados:
 *                   type: string
 *                 lesion:
 *                   type: string
 *       500:
 *         description: Internal server error.
 */
router.get('/historialJugadores/:id', jugadoresController.getHistorialByID);

/**
 * @openapi
 * /api/v1/historialJugadores/fecha/{fecha}:
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
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               properties:
 *                 id_jugador:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 fecha_registro:
 *                   type: date
 *                 equipo:
 *                   type: string
 *                 ranking_general:
 *                   type: integer
 *                 ranking_equipo:
 *                   type: integer
 *                 ranking_posicion:
 *                   type: integer
 *                 tarjeta_amarilla:
 *                   type: integer
 *                 tarjeta_roja:
 *                   type: integer
 *                 doble_tarjeta_amarilla:
 *                   type: integer
 *                 titular:
 *                   type: boolean
 *                 mejor_fichaje:
 *                   type: boolean
 *                 media_sofascore:
 *                   type: number
 *                   format: double
 *                   example: "0.00"
 *                 media_puntos:
 *                   type: number
 *                   format: double
 *                   example: 0.00
 *                 total_puntos:
 *                   type: number
 *                   format: double
 *                   example: 0.00
 *                 puntos_buenos:
 *                   type: integer
 *                 oferta_minima:
 *                   type: integer
 *                 valor_mercado:
 *                   type: integer
 *                 propietario:
 *                   type: string
 *                 posicion:
 *                   type: string
 *                 racha:
 *                   type: string
 *                 partidos_jugados:
 *                   type: string
 *                 lesion:
 *                   type: string
 *       500:
 *         description: Internal server error.
 */

router.get("/historialJugadores/fecha/:fecha", jugadoresController.getHistorialByDia);

module.exports = router;