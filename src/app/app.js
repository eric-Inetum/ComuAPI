const express = require('express');
const morgan = require('morgan');
const routerJugadores = require('../routers/jugadores_router');
const routerHistorial = require('../routers/historial_router');
const { limiter } = require('../security/security');
const{checkJwt} = require('../security/security');

const app = express();

app.use(morgan("dev"));

app.use(express.json());

app.use(limiter);

app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).json({ error: 'Error en el middleware de manejo de errores'})
});
app.use("/api/v2/jugadores",  routerJugadores);
app.use("/api/v2/historialJugadores", routerHistorial);


module.exports = app;