const { rateLimit } = require("express-rate-limit");
const { auth } = require('express-oauth2-jwt-bearer');
const WHITELISTED_IPS = new Set(["10.228.64.234", "10.228.64.201", "10.228.64.158"]);  


//limitamos las conexiones para evitar ataques DDoS
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 1000 // limitamos cada ip a 1000 peticiones cada 15 mins, se puede cambiar segun necesidad
  });


  function customLimiter(req, res, next) {
    // Extraemos la ip
    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    // Verificamos si esta en la whitelist
    if (WHITELISTED_IPS.has(ip)) {
        // Y si lo esta, ignoramos el limiter
        next();
    } else {
        // En caso contrario, aplicamos el limiter
        limiter(req, res, next);
    }
}


  //jwt auth
  const checkJwt = auth({
    audience: 'https://comu-api-atuh0/',
    issuerBaseURL: 'https://dev-1pgxzwyii2blucvg.eu.auth0.com/',
    tokenSigningAlg: 'RS256'
  });


  module.exports= {
    customLimiter,
    checkJwt
  };