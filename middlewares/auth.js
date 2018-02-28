'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function isAuth (req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: 'No tienes autorización' })
  }

  //const token = req.headers.authorization.replace(/['"]+/g, '')
  const token = req.headers.authorization.split(' ')[1]

  try{
    const payload = jwt.decode(token, config.SECRET_TOKEN)

    if (payload.exp <= moment().unix()) {
      return res.status(401).send({
        message: 'El token ha expirado'
      })
    }
  }catch(ex){
    return res.send(404).send({
      message: 'El token no es válido'
    })
  }

  req.user = payload

  next()
}

module.exports = isAuth