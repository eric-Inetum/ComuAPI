const router = require('express').Router();
const controller = require('../controllers/post_controller');

router.post('/jugador', controller.postJugador);

module.exports = router;