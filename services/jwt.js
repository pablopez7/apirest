'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const secret = 'clave_secreta_para_mi_api_restful'

exports.createToken = function (user) {
    const payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(30, 'days').unix()
    }

    return jwt.encode(payload, secret)
}