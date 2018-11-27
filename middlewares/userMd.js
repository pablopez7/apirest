'use strict'

const { validationResult } = require('express-validator/check');

const middlewareUser = {};

middlewareUser.validatePostRequestUser = function (req, res, next) {
	const errors = validationResult(req);
	// Si existen errores
	if (!errors.isEmpty()) {
		return res.status(422).json({
			errors: errors.mapped()
		});
	}
	// si no hay errores se pasa a la accion del request
	next();
};

module.exports = middlewareUser;