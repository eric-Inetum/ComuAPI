const router = require('express').Router();

const controller = require('../controllers/jugadores_get_controller');

router.get("/jugadores", controller.getJugadores);
router.get("/jugadores/:id", controller.getJugadorPorId);

module.exports = router;