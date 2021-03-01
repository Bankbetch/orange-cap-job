require('dotenv').config();

module.exports = {
  port: process.env.PORT || 3000,
  isProduction: process.env.NODE_ENV === 'production',
  apiVersion: process.env.API_VERSION || 1,
  mongodbUri: process.env.MONGODB_URI,
  pageLimit: process.env.PAGE_LIMIT || 15,
  jwksRequestsPerMinute: process.env.JWKS_REQUESTS_PER_MINUTE,
  jwksUri: process.env.JWKS_URI,
  audience: process.env.AUDUENCE,
  issuer: process.env.ISSUER,
  algorithms: process.env.ALGORITHMS,
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.CLIENT_SECRET,
  base_url: process.env.BASE_URL,
};
