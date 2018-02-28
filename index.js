'use strict'

const mongoose = require('mongoose')
const app = require('./app')

const port = process.env.PORT || 3000
const db = 'apirest'

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/apirest')
    .then(() => {
        console.log(`La conexion a la base de datos '${db}' se ha realizado con exito`)

        app.listen(port, () => {
            console.log(`API RESTFull corriendo en http://localhost:${port}`)
        })
    })
    .catch(err => console.log(err))