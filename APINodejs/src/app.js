const express = require('express');
const app = express();
const { Client } = require('pg');
const morgan = require('morgan');
const bodyParser = require('body-parser');


app.use(bodyParser.json());
app.use(morgan('dev'));

// Conexion con base de datos
const client = new Client({
    host: '10.228.64.234',
    port: 5432,
    database: 'prueba',
    user: 'postgres',
    password: 'fBA!VSSGw!8af^&2',
});

client.connect();
/*
Endpoints
GET /jugadores
GET /jugador/:{id}
GET /jugador/:{id}/general
GET /jugador/:{id}/infoMercado
GET /jugador/:{id}/estadistica
GET /jugador/:{id}/:campo
PATCH /jugador/:{id}/actualizar
GET /jugador/:{id}/:{campo}
Post /post/jugador
GET /get/jugador/:{id}/puntos
GET /get/historial_jugador/:{id}/dias/:{dias}
GET /get/historial_jugador/:{id}/general/dias/:{dias}
GET /get/historial_jugador/:{id}/mercado_valor/dias/:{dias}
GET /get/historial_jugador/:{id}/puntos/dias/:{dias}
GET /get/historial_jugador/:{id}/estadistica/dias/:{dias}
GET /get/historial_jugador/:{id}/:campo/dias/:{dias}
GET /get/mejor_fichaje
*/


// Get de todos los jugadores
app.get('/api/v1/jugadores', (req, res) => {
    const query = `SELECT *
                FROM jugadores`;
    client.query(query, (error, results) => {
        if (error) {
            console.error("Error executing MySQL query:", error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        const jugador = results.rows;
        res.status(200).json({ jugador });
    });
});


// Devuelve todos los datos de un jugador buscado por su ID
app.get('/api/v1/jugador/:id', (req, res) => {
    const id = req.params.id;
    const query = `SELECT *
                FROM jugadores 
                WHERE id_jugador = $1`;

    const values = [id];
    client.query(query, values, (error, results) => {
        if (error) {
            console.error("Error executing MySQL query:", error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        const jugador = results.rows;
        res.status(200).json({ jugador });
    });
});

// Devuelve los datos generales de un jugador buscando por su ID
app.get("/api/v1/jugador/:id/general", (req, res) => {
    const id = req.params.id;
    const query = "SELECT nombre, propietario, equipo, posicion, titular, partidos_jugados, mejor_fichaje, racha, lesion FROM jugadores WHERE id_jugador = $1;";
    const values = [id];
    client.query(query, values, (error, results) => {
        if (error) {
            console.error("Error executing MySQL query:", error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        const jugador = results.rows;
        res.status(200).json({ jugador });
    })
})

// Devuelve los campos relativos al mercado del jugador buscado por ID.
app.get('/api/v1/jugador/:id/infoMercado', (req, res) => {
    const id = req.params.id;
    const query = `SELECT nombre, oferta_minima, valor_mercado, valor_mercado_max, valor_mercado_min
                FROM jugadores
                WHERE id_jugador = $1`;
    const values = [id]
    client.query(query, values, (error, results) => {
        if (error) {
            console.error("Error executing MySQL query:", error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        const jugador = results.rows;
        res.status(200).json({ jugador });
    })
})

// Devuelve los campos relativos a las estadisticas del jugador buscado por ID.
app.get('/api/v1/jugador/:id/estadistica', (req, res) => {
    const id = req.params.id;
    const query = `SELECT nombre, ranking_general, ranking_equipo, ranking_posicion, tarjeta_amarilla, doble_tarjeta_amarilla, tarjeta_roja
    FROM jugadores
    WHERE id_jugador = $1`;
    const values = [id]
    client.query(query, values, (error, results) => {
        if (error) {
            console.error("Error executing MySQL query:", error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        const jugador = results.rows;
        res.status(200).json({ jugador });
    })
})

// Actualiza la información del jugador que coincida con su ID
app.patch('/api/v1/jugador/:id/actualizar', (req, res) => {
    const id = req.params.id;
    const {
        propietario, equipo, posicion, titular, partidos_jugados, ranking_general,
        mejor_fichaje, media_softscore, media_puntos, total_puntos, puntos_buenos, oferta_minima,
        valor_mercado, valor_mercado_max, valor_mercado_min, ranking_equipo, ranking_posicion,
        tarjeta_amarilla, tarjeta_roja, doble_tarjeta_amarilla, racha, lesion
    } = req.body;

    const query = `
        UPDATE jugadores 
        SET propietario = $1, equipo = $2, posicion = $3, titular = $4, partidos_jugados = $5,
        ranking_general = $6, mejor_fichaje = $7, media_softscore = $8, media_puntos = $9, total_puntos = $10,
        puntos_buenos = $11, oferta_minima = $12, valor_mercado = $13, valor_mercado_max = $14,
        valor_mercado_min = $15, ranking_equipo = $16, ranking_posicion = $17, tarjeta_amarilla = $18,
        tarjeta_roja = $19, doble_tarjeta_amarilla = $20, racha = $21, lesion = $22
        WHERE id_jugador = $23`;

    const values = [
        propietario, equipo, posicion, titular, partidos_jugados, ranking_general,
        mejor_fichaje, media_softscore, media_puntos, total_puntos, puntos_buenos, oferta_minima,
        valor_mercado, valor_mercado_max, valor_mercado_min, ranking_equipo, ranking_posicion,
        tarjeta_amarilla, tarjeta_roja, doble_tarjeta_amarilla, racha, lesion, id
    ];

    client.query(query, values, (error, results) => {
        if (error) {
            console.error("Error executing PostgreSQL query:", error);
            res.status(500).json({ error: "Error interno del servidor" });
            return;
        }
        res.status(200).json({ mensaje: "Jugador actualizado" });
    });
});

// Devuelve un dato concreto de un jugador buscando por su ID
app.get("/api/v1/jugador/:id/:campo", (req, res) => {
    const id = req.params.id;
    const campo = req.params.campo;
    const query = `SELECT $2 FROM jugadores WHERE id_jugador = $1`;
    const values = [id, campo];
    client.query(query, values, (error, results) => {
        if (error) {
            console.error("Error executing MySQL query:", error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        const jugador = results.rows;
        res.status(200).json({ jugador });
    });
});

// Crea un jugador en la BD
app.post('/api/v1/post/jugador', (req, res) => {
    const {
        id, nombre, propietario, equipo, posicion, titular, partidos_jugados, ranking_general, ranking_equipo,
        ranking_posicion, media_sofascore, media_puntos, total_puntos, valor_mercado, valor_mercado_max,
        valor_mercado_min, tarjeta_amarilla, tarjeta_roja, doble_tarjeta_amarilla, racha, lesion
    } = req.body;

    const query = `INSERT INTO jugadores (id, nombre, propietario, equipo, posicion, titular, partidos_jugados,
                    ranking_general, ranking_equipo, ranking_posicion, media_sofascore, media_puntos, total_puntos,
                    valor_mercado, valor_mercado_max, valor_mercado_min, tarjeta_amarilla, tarjeta_roja, doble_tarjeta_amarilla, racha, lesion)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21)`;

    const values = [
        id, nombre, propietario, equipo, posicion, titular, partidos_jugados, ranking_general, ranking_equipo,
        ranking_posicion, media_sofascore, media_puntos, total_puntos, valor_mercado, valor_mercado_max,
        valor_mercado_min, tarjeta_amarilla, tarjeta_roja, doble_tarjeta_amarilla, racha, lesion
    ]

    client.query(query, values, (error, results) => {
        if (error) {
            console.error("Error executing MySQL query:", error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        res.status(200).json({ mensaje: "Jugador creado" });
    });
});

// Get del pack "puntos" para el jugador por id
app.get('/api/v1/jugador/:id/puntos', (req, res) => {
    const id = req.params.id;
    const query = 'SELECT nombre, media_softscore, media_puntos, total_puntos, puntos_buenos FROM jugadores WHERE id_jugador = $1';
    const values = [id];
    client.query(query, values, (error, results) => {
        if (error) {
            console.error("Error executing MySQL query:", error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        const jugadores = results.rows;
        res.status(200).json({ jugadores });
    });
});

// Get el historial de un jugador por id especificando dias
app.get('/api/v1/historial_jugador/:id/dias/:dias', (req, res) => {
    const id = req.params.id;
    const dias = req.params.dias;
    const query = 'SELECT * FROM historial_jugadores WHERE id_jugador = $1 ORDER BY id_historial_jugador DESC LIMIT $2;';
    const values = [id, dias];
    client.query(query, values, (error, results) => {

        if (error) {
            console.error("Error executing MySQL query:", error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        const jugadores = results.rows;
        res.status(200).json({ jugadores });
    });
});

// Get del historial de un jugador por id especificando dias el paquete general
app.get('/api/v1/historial_jugador/:id/general/dias/:dias', (req, res) => {
    const id = req.params.id;
    const dias = req.params.dias;
    const query = 'SELECT nombre, equipo, posicion, titular, partidos_jugados, racha, fecha_registro FROM historial_jugadores WHERE id_jugador = $1 ORDER BY id_historial_jugador DESC LIMIT $2;'
    const values = [id, dias];
    client.query(query, values, (error, results) => {
        if (error) {
            console.error("Error executing MySQL query:", error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        const jugadores = results.rows;
        res.status(200).json({ jugadores });
    });
});

// Get del historial de un jugador por id especificando dias el paquete mercado valor
app.get('/api/v1/historial_jugador/:id/mercado_valor/dias/:dias', (req, res) => {
    const id = req.params.id;
    const dias = req.params.dias;
    const query = 'SELECT nombre, valor_mercado, fecha_registro FROM historial_jugadores WHERE id_jugador = $1 ORDER BY id_historial_jugador DESC LIMIT $2;'
    const values = [id, dias];
    client.query(query, values, (error, results) => {
        if (error) {
            console.error("Error executing MySQL query:", error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        const jugadores = results.rows;
        res.status(200).json({ jugadores });
    });
});

// Get del historial de un jugador por id especificando dias el paquete puntos
app.get('/api/v1/historial_jugador/:id/puntos/dias/:dias', (req, res) => {
    const id = req.params.id;
    const dias = req.params.dias;
    const query = 'SELECT nombre, media_softscore, media_puntos, total_puntos, fecha_registro FROM historial_jugadores WHERE id_jugador = $1 ORDER BY id_historial_jugador DESC LIMIT $2;'
    const values = [id, dias];
    client.query(query, values, (error, results) => {
        if (error) {
            console.error("Error executing MySQL query:", error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        const jugadores = results.rows;
        res.status(200).json({ jugadores });
    });
});

// Get del historial de un jugador por id especificando dias el paquete estadistica
app.get('/api/v1/historial_jugador/:id/estadistica/dias/:dias', (req, res) => {
    const id = req.params.id;
    const dias = req.params.dias;
    const query = 'SELECT nombre, ranking_general, ranking_equipo, ranking_posicion, tarjeta_amarilla, doble_tarjeta_amarilla, tarjeta_roja FROM historial_jugadores WHERE id_jugador = $1 ORDER BY id_historial_jugador DESC LIMIT $2;'
    const values = [id, dias];
    client.query(query, values, (error, results) => {
        if (error) {
            console.error("Error executing MySQL query:", error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        const jugadores = results.rows;
        res.status(200).json({ jugadores });
    });
});

// Get un campo del historial de un jugador por id especificando dias el paquete estadistica
app.get('/api/v1/historial_jugador/:id/:campo/dias/:dias', (req, res) => {
    const id = req.params.id;
    const campo = req.params.campo;
    const dias = req.params.dias;
    const query = 'SELECT $2 FROM historial_jugadores WHERE id_jugador = $1 ORDER BY id_historial_jugador DESC LIMIT $3;';
    const values = [id, campo, dias];
    client.query(query, values, (error, results) => {
        if (error) {
            console.error("Error executing MySQL query:", error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        const jugadores = results.rows;
        res.status(200).json({ jugadores });
    });
});

// Get al mejor fichaje de todos los que hay
app.get('/api/v1/mejor_fichaje', (req, res) => {
    const query = 'SELECT * FROM jugadores WHERE mejor_fichaje = true';
    client.query(query, (error, results) => {
        if (error) {
            console.error("Error executing MySQL query:", error);
            res.status(500).json({ error: "Internal Server Error" });
            return;
        }
        const jugadores = results.rows;
        res.status(200).json({ jugadores });
    });
});

app.listen(80, () => {
    console.log(`Server running on port ${80}`);
});