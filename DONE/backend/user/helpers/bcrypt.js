const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const generateUserPassword = (password) => {
  bcrypt.hashSync(password, 10);
  return crypto
    .createHash("sha256", "my_secret")
    .update(password)
    .digest("hex");
};

const comparePassword = (password, anotherPassword) =>
  bcrypt.compareSync(password, anotherPassword);

exports.generateUserPassword = generateUserPassword;
exports.comparePassword = comparePassword;
