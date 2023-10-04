const express = require('express');
const router = express.Router();
const jugadoresController = require('../controllers/update_controller.js');

/**
 * @openapi
 * /api/v1/jugadores/{id_jugador}/actualizar:
 *   patch:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *     - "Gestion de jugadores"
 *     summary: Actualiza un jugador a traves de su id.
 *     description: Actualiza un jugador a traves de su id.
 *     parameters:
 *       - name: id_jugador
 *         in: path
 *         description: ID del jugador a buscar
 *         required: true
 *         schema: 
 *           type: integer
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
 *         application/json:
 *           schema:
 *             type: array  
 *             items:        
 *               type: object
 *               properties:
 *                 id_jugador:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 fecha_registro:
 *                   type: string  
 *                   format: date  
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
 *                   example: 0.00
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
 *           example:
 *             - id_jugador: 1
 *               nombre: Jugador 1
 *               fecha_registro: "2023-09-29"
 *               equipo: Equipo A
 *               ranking_general: 1
 *               ranking_equipo: 1
 *               ranking_posicion: 1
 *               tarjeta_amarilla: 2
 *               tarjeta_roja: 0
 *               doble_tarjeta_amarilla: 0
 *               titular: true
 *               mejor_fichaje: true
 *               media_sofascore: 85.5
 *               media_puntos: 8.2
 *               total_puntos: 164
 *               puntos_buenos: 10
 *               oferta_minima: 100000
 *               valor_mercado: 500000
 *               propietario: Usuario1
 *               posicion: Delantero
 *               racha: Ganando
 *               partidos_jugados: 10
 *               lesion: Ninguna
 *
 *       500:
 *         description: Internal server error.
 */
router.patch("/jugadores/:id/actualizar", jugadoresController.patchJugador);

/**
 * @openapi
 * /api/v1/jugadores/insertar:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *     - "Gestion de jugadores"
 *     summary: Crea a un jugador.
 *     description: Inserta a un jugador dentro de la base de datos. Es necesario que el id del jugador sea unico para que su inserción sea satisfactoria.
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
 *                 jugadores:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id_jugador:
 *                         type: integer
 *                         example: 1952
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
 *         description: Internal server error.
 */
router.post("/jugadores/insertar", jugadoresController.postJugador);

/**
 * @openapi
 * /api/v1/jugadores:
 *   post:
 *     security:
 *       - BearerAuth: []
 *     tags:
 *     - "Gestion de jugadores"
 *     summary: Inserta los jugadores a traves del JSON del Webscraping.
 *     description: Crea todos los jugadores en la tabla de jugadores en la base de datos a traves del JSON del Webscraping.
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
 *         application/json:
 *           schema:
 *             type: array  
 *             items:        
 *               type: object
 *               properties:
 *                 id_jugador:
 *                   type: integer
 *                 nombre:
 *                   type: string
 *                 fecha_registro:
 *                   type: string  
 *                   format: date  
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
 *                   example: 0.00
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
 *           example:
 *             - id_jugador: 1
 *               nombre: Jugador 1
 *               fecha_registro: "2023-09-29"
 *               equipo: Equipo A
 *               ranking_general: 1
 *               ranking_equipo: 1
 *               ranking_posicion: 1
 *               tarjeta_amarilla: 2
 *               tarjeta_roja: 0
 *               doble_tarjeta_amarilla: 0
 *               titular: true
 *               mejor_fichaje: true
 *               media_sofascore: 85.5
 *               media_puntos: 8.2
 *               total_puntos: 164
 *               puntos_buenos: 10
 *               oferta_minima: 100000
 *               valor_mercado: 500000
 *               propietario: Usuario1
 *               posicion: Delantero
 *               racha: Ganando
 *               partidos_jugados: 10
 *               lesion: Ninguna
 *
 *       500:
 *         description: Internal server error.
 */
router.post("/jugadores", jugadoresController.postJugadores);

/**
 * @openapi
 * /api/v1/historialJugadores:
 *   post:
 *     security:
 *     - BearerAuth: []
 *     tags:
 *     - "Gestion de jugadores"
 *     summary: Crea todos los jugadores en la tabla de historial en la base de datos a través del JSON del webscraping.
 *     description: Al hacer una llamada a este POST se hace una pre-request interna para obtener todos los datos de los jugadores y posteriormente insertarlos. Debido a esto no es necesario indicar un body.
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
router.post("/historialJugadores", jugadoresController.insertHistorial);

module.exports = router;