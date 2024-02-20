const registerValidation = require("./Joi/registerValidation");
const loginValidation = require("./Joi/loginValidation");

require("dotenv").config;
const validator = process.env.VALIDATOR;

const validateRegistration = (user) => {
  if (validator === "Joi") return registerValidation(user);
};

const validateLogin = (user) => {
  if (validator === "Joi") return loginValidation(user);
};

exports.validateRegistration = validateRegistration;
exports.validateLogin = validateLogin;
