const { check } = require('express-validator/check');

const userValidate = {};


function findUserByEmail(email, onSuccess, onError) {
	if (email === 'foo@bar.com') {
		return onError('Usuario ya existe');
	}

	return onSuccess('Usuario valido');
}

userValidate.getCheckRulesUser = [
	check('email').isEmail().withMessage('email invalido')
    .custom(email => {
      return findUserByEmail(
      	email,
      	function(success) {
      		return email;	
      	},
      	function (error) {
        	throw new Error('this email is already in use');
      });
    }),    
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