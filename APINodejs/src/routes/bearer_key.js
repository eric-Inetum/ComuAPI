const express = require('express');
const router = express.Router();
const bearerKeyController = require('../controllers/bearer_key_controller.js');


/**
 * @openapi
 * /api/v1/token:
 *   post:
 *     tags:
 *       - "Bearer Key"
 *     summary: Proporciona la clave de acceso a la API
 *     description: La clave de acceso tiene que incluirse en el pop-up Authorize.
 *     responses:
 *       200:
 *         description: Bearer key successfully provided.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: The Bearer token.
 *       500:
 *         description: Internal server error.
 */
router.post('/token', bearerKeyController.postKey);
module.exports = router;