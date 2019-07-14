const Joi = require('@hapi/joi');

const registerSchemaValidation = data => {
  const schema = {
    name: Joi.string()
      .required()
      .min(1)
      .max(50),
    email: Joi.string()
      .required()
      .email()
      .max(255),
    password: Joi.string()
      .required()
      .min(12)
      .max(1024)
  };
  return Joi.validate(data, schema);
};

module.exports = {
  registerSchemaValidation: registerSchemaValidation
};
