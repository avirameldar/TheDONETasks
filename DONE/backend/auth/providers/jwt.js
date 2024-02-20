const jwt = require("jsonwebtoken")
require("dotenv").config()

const key = process.env.JWT_SECRET

const generateAuthToken = (user) => {
  const {
    _id,
    premiumUser,
    isSysAdmin,
    email
  } = user
  const payloadData = { _id, premiumUser, isSysAdmin, email }
  const token = jwt.sign(payloadData, key)
  return token
}

const verifyToken = (tokenFromClient) => {
  try {
    const userData = jwt.verify(tokenFromClient, key)
    return userData
  } catch (error) {
    return null
  }
}

module.exports = {
  generateAuthToken,
  verifyToken
}
