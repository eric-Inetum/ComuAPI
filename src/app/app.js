const express = require('express');
const morgan = require('morgan');

const router = require('../routers/jugadores_router');

const app = express();

app.use(morgan("dev"));

app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).json({ error: 'Error en el middleware de manejo de errores'})
});

app.use("/api/v2", router);

module.exports = app;