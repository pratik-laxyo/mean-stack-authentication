const Joi = require('@hapi/joi');

// Register Validation
const RegisterValidation = data => {
	const schema = Joi.object({
		name: Joi.string().min(3).required(),
		email: Joi.string().min(6).required().email(),
		password: Joi.string().min(6).required(),
	});
	return schema.validate(data);
};


// Login Validation
const LoginValidation = data => {
	const schema = Joi.object({
		email: Joi.string().min(6).required().email(),
		password: Joi.string().min(6).required(),
	});
	return schema.validate(data);
};

module.exports.RegisterValidation = RegisterValidation;	
module.exports.LoginValidation = LoginValidation;	