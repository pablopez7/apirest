'use strict'

const express = require('express')
const bodyParser = require('body-parser')

const app = express()

//Cargar Rutas
const userRoutes = require('./routes/userRoute')

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Cors

//Rutas
app.use('/api', userRoutes)

module.exports = app