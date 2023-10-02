const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const { limiter, jwtCheck, checkJwt } = require('./security.js')
const getJugadoresRoutes = require('./routes/player_routes.js');
const getHistorialRoutes = require("./routes/historial_routes.js");
const updateRoutes = require("./routes/update_routes.js");
const { swaggerDocs: V1SwaggerDocs } = require("./swagger");
const postBearerKey = require('./routes/bearer_key.js');

const PORT = process.env.PORT || 80;

// Middlewares
//app.use(limiter); // Apply limiter first
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());
app.get('/authorized', function (req, res) {
    res.send('Secured Resource');
});
app.use((err, req, res, next)=>{
    console.error(err.stack);
    res.status(500).json({ error: 'Error en el middleware de manejo de errores'})
});

// Swagger initialization - after other middlewares but before routes
V1SwaggerDocs(app, PORT);

// Routes
//
app.use('/api/v1', postBearerKey);
//app.use(checkJwt);
app.use('/api/v1', getJugadoresRoutes);
app.use('/api/v1', getHistorialRoutes);
app.use('/api/v1', updateRoutes);




// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
