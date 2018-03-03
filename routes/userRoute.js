'use strict'

const express = require('express')
const UserCtrl = require('../controllers/userControler')
const auth = require('../middlewares/auth')
const userValidate = require('../middlewares/userMd')

const userValidateRules = require('../validations/userValidation')

const api = express.Router()

api.post('/user',
                userValidateRules.getCheckRulesUser,
                userValidate.validatePostRequestUser,
                UserCtrl.saveUser)

api.post('/login', UserCtrl.loginUser)

api.get('/user/:id', auth, UserCtrl.getUser)

api.get('/users/:page?', auth, UserCtrl.getUsers)

module.exports = api