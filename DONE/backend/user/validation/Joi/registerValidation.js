const Joi = require("joi");
//const passwordRegex = new RegExp("[!@%$#^&*-_*(]")
const registerValidation = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(255).required(),
    email: Joi.string()
      .min(2)
      .max(255)
      .required()
      .email({ tlds: { allow: false } }),
    password: Joi.string().min(8).max(1024)./*pattern(passwordRegex).*/required(),

    // .rule({
    //   message:
    //     'user "password" must be at least six characters long and contain an uppercase letter, a lowercase letter, a number and one of the following characters !@#$%^&*()+_-=`~{}"',
    // })

    // .required(),
    premiumUser: Joi.boolean().required(),
    // isAdmin: Joi.boolean().allow(""),
  });
  return schema.validate(user);
};

module.exports = registerValidation;
