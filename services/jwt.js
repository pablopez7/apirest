'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

exports.createToken = function (user) {
    const payload = {
        sub: user._id,
        name: user.name,
        surname: user.surname,
        nick: user.nick,
        email: user.email,
        role: user.role,
        picture: user.picture,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    }

    return jwt.encode(payload, config.SECRET_TOKEN)
}