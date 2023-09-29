const fs = require('fs');
const request = require('request');


//Funcion para obtener los registros de todas las fechas del historial a traves del id del jugador
const postKey = (req, res) => {
    var request = require("request");
    var options = { method: 'POST',
    url: 'https://dev-1pgxzwyii2blucvg.eu.auth0.com/oauth/token',
    headers: { 'content-type': 'application/json' },
    body: '{"client_id":"wcovXxKIuVEUMFDbdmnN32N4FxzZbTsh","client_secret":"3OTmJF5OXhkm2d3LvVrAuhgbD-7uETYAsN5PZUGM2uhdHFQsU5x6o1B2NOzmVzh-","audience":"https://comu-api-atuh0/","grant_type":"client_credentials"}' };

    request(options, function (error, res, body) {
    if (error) throw new Error(error);

    console.log(body);
    });

 };
 
 module.exports={
    postKey
}