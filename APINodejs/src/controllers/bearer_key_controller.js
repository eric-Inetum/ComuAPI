const request = require('request');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../../.env') });

const postKey = (req, res) => {
    const options = {
        method: 'POST',
        url: 'https://dev-1pgxzwyii2blucvg.eu.auth0.com/oauth/token',
        headers: { 
            'content-type': 'application/json',

    },
        body: JSON.stringify({
            client_id: process.env.AUTHO_CLIENT_ID,
            client_secret: process.env.AUTHO_CLIENT_SECRET,
            audience: "https://comu-api-atuh0/",
            grant_type: "client_credentials"
        })
    };

    request(options, function (error, response, body) {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: 'Failed to fetch bearer token.' });
        }
        console.log("Auth0 Response:", response.statusCode, body);
        res.json(JSON.parse(body));
    });
};

module.exports = {
    postKey
}
