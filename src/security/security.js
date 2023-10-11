const { rateLimit } = require("express-rate-limit");
const { auth } = require('express-oauth2-jwt-bearer');

// Limitamos las conexiones para evitar ataques DDoS
const limiter = rateLimit({
  windowMs: 1000 , // 1 sec
  max: 100 // 100 peticiones cada segundo por ip
});

const checkJwt = auth({
  audience: 'https://comu-api-atuh0/',
  issuerBaseURL: 'https://dev-1pgxzwyii2blucvg.eu.auth0.com/',
  tokenSigningAlg: 'RS256'
});


module.exports = {
  limiter,
  checkJwt
};
