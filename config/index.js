module.exports = {
  port: process.env.PORT || 3000,
  db: process.env.MONGODB_URI || 'mongodb://localhost:27017/smartGPS',
  projName: 'SmartGPS',
  dbName: 'smartGPS',
  SECRET_TOKEN: 'clave_secreta_para_mi_api_restful'
}