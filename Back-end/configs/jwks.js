const jwt = require('express-jwt');
const jwksRsa = require('jwks-rsa');
const config = require('./app');

module.exports.checkJwt = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: config.jwksRequestsPerMinute,
    jwksUri: config.jwksUri,
  }),

  // Validate the audience and the issuer.
  audience: config.audience,
  issuer: config.issuer,
  algorithms: [config.algorithms],
});
