'use strict'

const express = require('express')
const UserCtrl = require('../controllers/userControler')
const auth = require('../middlewares/auth')

const api = express.Router()

api.post('/user', auth, UserCtrl.saveUser)
api.post('/login', UserCtrl.loginUser)

module.exports = api