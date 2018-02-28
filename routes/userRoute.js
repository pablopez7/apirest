'use strict'

const express = require('express')
const UserCtrl = require('../controllers/userControler')

const api = express.Router()

api.post('/user', UserCtrl.saveUser)
api.post('/login', UserCtrl.loginUser)

module.exports = api