require('dotenv').config();

module.exports = {
  port: process.env.PORT || 5000,
  mongodbURI: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  corsOrigin: process.env.CORS_ORIGIN
};