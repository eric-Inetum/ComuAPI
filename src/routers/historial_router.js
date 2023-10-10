const router = require('express').Router();

const controllerGet = require('../controllers/historial_get_controller');
const controllerPost = require('../controllers/historial_post_controller');

router.get('/historialJugadores/id/:id', controllerGet.getHistorialByID);
router.get("/historialJugadores/fecha/:fecha", controllerGet.getHistorialByDia);
router.post("/historialJugadores", controllerPost.insertHistorial);

module.exports = router;