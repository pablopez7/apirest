'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.Promise = global.Promise
mongoose.connect(config.db)
    .then(() => {
        console.log(`La conexion a la base de datos '${config.dbName}' se ha realizado con exito`)

        app.listen(config.port, () => {
            console.log(`API RESTFull corriendo en http://localhost:${config.port}`)
        })
    })
    .catch(err => console.log(`Error al conectarse a la Base de Datos ${err}`))