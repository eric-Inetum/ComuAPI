const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const { customLimiter, jwtCheck, checkJwt } = require('./security.js')
const getJugadoresRoutes = require('./routes/player_routes.js');
const getHistorialRoutes = require("./routes/historial_routes.js");
const updateRoutes = require("./routes/update_routes.js");
const { swaggerDocs: V1SwaggerDocs } = require("./swagger");
const postBearerKey = require('./routes/bearer_key.js');

const PORT = process.env.PORT || 81;

// Middlewares
app.use(bodyParser.json());
app.use(morgan('dev'));
app.get('/authorized', function (req, res) {
    res.send('Secured Resource');
});
app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).json({ error: 'Error en el middleware de manejo de errores'})
});
app.use(cors());

// Swagger initialization - after other middlewares but before routes
V1SwaggerDocs(app, PORT);

// Routes
//funcional
app.use('/api/v1',customLimiter, postBearerKey);
//app.use(checkJwt);//usamos el authentication client credentials para las siguientes rutas
app.use('/api/v1',customLimiter, getJugadoresRoutes);
app.use('/api/v1',customLimiter, getHistorialRoutes);
app.use('/api/v1',customLimiter, updateRoutes);




// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
