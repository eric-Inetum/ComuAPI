const  swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

const api_host = process.env.API_HOST
const api_port = process.env.API_PORT;

// Basic Meta Informations about our API
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "ComuAPI",
      description: `Una api creada para conseguir información de jugadores de futbol registrado en comunio y comuniate. <br><br>El <b>Token</b> se pedira a traves de PostMan con las claves proporcionadas por los creadores <br><br>[ BaseUrl: http://${api_host}:${api_port}/api/v2 ]`,
      version: "2.0.0"
    },
    externalDocs: {
      description: "/docs.json",
      url: `http://${api_host}:${api_port}/api/v2/docs.json`},
    security: [ { BearerAuth: [] } ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  tags:[
    {
      name:"Autenticación",
      description: "Proporciona la clave para poder hacer consultas"
    },
    {
      name: "Jugadores",
      description: "Operaciones relacionadas con jugadores",
    },
    {
      name: "Historial Jugadores",
      description: "Operaciones relacionadas con el historial de los jugadores"
    },
    {
      name:"Gestion de jugadores",
      description: "Añadir un nuevo jugador"
    }
  ],
  apis: [
    path.join(__dirname, 'app.js'),
    path.join(__dirname, 'routers', 'jugadores_router.js'),
    path.join(__dirname, 'routers', 'historial_router.js'),
  ],
};

// Docs in JSON format
const swaggerSpec = swaggerJSDoc(options);

// Function to setup our docs
const swaggerDocs = (app) => {
  // Route-Handler to visit our docs
  app.use("/api/v2/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  // Make our docs in JSON format available
  app.get("/api/v2/docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });
  console.log(
    `Version 2 Docs are available on http://${api_host}:${api_port}/api/v2/docs`
    );
  };
  
  module.exports = { swaggerDocs };
