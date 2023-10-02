const { rateLimit } = require("express-rate-limit");
const { auth } = require('express-oauth2-jwt-bearer');


//limitamos las conexiones para evitar ataques DDoS
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5 // limitamos cada ip a 100 peticiones cada 15 mins, se puede cambiar segun necesidad
  });


  // //jwt auth
  // const checkJwt = auth({
  //   audience: 'https://comu-api-atuh0/',
  //   issuerBaseURL: 'https://dev-1pgxzwyii2blucvg.eu.auth0.com/',
  //   tokenSigningAlg: 'RS256'
  // });


  module.exports= {
    limiter,
   // checkJwt
  };
  