'use strict'

const { check } = require('express-validator/check');

const userValidate = {};

userValidate.getCheckRulesUser = [
	check('email').isEmail().withMessage('email invalido'),    
  	check('password', 'password debe contener al menos 5 caracteres y al menos 1 numero')
    .isLength({ min: 5 })
    .matches(/\d/),
    check('confirmPassword', 'password de confirmacion incorrecta.')
    .exists()
    .custom((confirmPassword, {req}) => {
    	return confirmPassword === req.body.password;
    })
];

module.exports = userValidate;