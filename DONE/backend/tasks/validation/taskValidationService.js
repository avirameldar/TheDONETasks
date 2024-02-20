const validateTaskWithJoi = require("./Joi/validateTaskWithJoi");

require("dotenv").config;
const validator = process.env.VALIDATOR;

const validateTask = (task) => {
  if (validator == "Joi") {
    const { error } = validateTaskWithJoi(task);
    if (error) return error.details[0].message;
    return false;
  }
};

module.exports = validateTask;
