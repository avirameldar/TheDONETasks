const User = require("./user")
const _ = require("lodash")
const crypto = require("crypto")
const { handleBadRequest } = require("../../middleware/handleError")
require("dotenv").config
const DB = process.env.DB || "MONGODB"

const { generateAuthToken } = require("../../auth/providers/jwt")
const { comparePassword, generateUserPassword } = require("../helpers/bcrypt")

const registerUser = async (normalizedUser) => {
  if (DB === "MONGODB") {
    try {
      const { email } = normalizedUser
      let user = await User.findOne({ email })

      if (user) {
        throw Error("User already registered")
      }

      user = new User(normalizedUser)
      user = await user.save()

      // user = _.pick(user, ["name", "email", "_id"])

      const token = generateAuthToken(user)

      return Promise.resolve(token)
    } catch (err) {
      err.status = 400
      return Promise.reject(err)
    }
  }
  return Promise.resolve("registerUser new user not in mongodb")
}

const loginUser = async ({ email, password }) => {
  if (DB === "MONGODB") {
    try {
      const user = await User.findOne({ email })
      if (!user) {
        throw new Error("Invalid email or password")
      }


      const encrypted = generateUserPassword(password)
      const validPassword = encrypted === user.password


      if (!validPassword) {
        throw new Error("Invalid email or password")
      }


      const token = generateAuthToken(user)
      return Promise.resolve(token)

    } catch (error) {
      return handleBadRequest("Mongoose", error)
    }
  }
  return Promise.resolve("loginUser user not in mongodb")
}

const getUsers = async () => {
  if (DB === "MONGODB") {
    try {
      const users = await User.find({}, { password: 0, __v: 0 })
      return Promise.resolve(users)
    } catch (error) {
      return handleBadRequest("Mongoose", error)
    }
  }
  return Promise.resolve("get users not in mongodb")
}


const getUser = async (userId) => {
  if (DB === "MONGODB") {
    try {
      let user = await User.findById(userId, {
        password: 0,
        __v: 0,
      })
      if (!user) throw new Error("Could not find this user in the database")
      return Promise.resolve(user)
    } catch (error) {
      return handleBadRequest("Mongoose", error)
    }
  }
  return Promise.resolve("get user not in mongodb")
}

const updateUser = async (userId, normalizedUser) => {
  if (DB === "MONGODB") {
    try {
      let user = await User.findByIdAndUpdate(userId, normalizedUser, {
        new: true,
      })
      if (!user) {
        throw new Error("The user with this id didn't found")
      }
      return Promise.resolve(user)
    } catch (error) {
      return createError("Mongoose", error)
    }
  }
  return Promise.resolve("card update not in mongodb")
}

const changeUserAccount = async (userId) => {
  if (DB === "MONGODB") {
    try {
      let user = User.findById(userId)
      user.premiumUser = !user.premiumUser
      user.save()
      return Promise.resolve(`user no. ${userId} change his account status!`)
    } catch (error) {
      return createError("Mongoose", error)
    }
  }
  return Promise.resolve("change User Account is not in mongodb")
}

const deleteUser = async (userId, userIdToDelete) => {
  if (DB === "MONGODB") {
    try {
      let userToDelete = await User.findById(userIdToDelete)
      let user = await User.findById(userId)
      if (!user || !userToDelete)
        throw new Error("A user with this ID cannot be found in the database")

      userToDelete = await User.findByIdAndDelete(userIdToDelete)
      return Promise.resolve(userToDelete)
    } catch (error) {
      return createError("Mongoose", error)
    }
  }
  return Promise.resolve("user deleted not in mongodb")
}

// create subscribe function in userAccessDataService.js
const subscribe = async (userId) => {
  if (DB === "MONGODB") {
    try {
      // change to find one and update
      let user = await User.findOneAndUpdate(
        { _id: userId },
        { premiumUser: true },
        { new: true }
      )
      return Promise.resolve(user)
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return Promise.resolve("subscribe to mongo ")
}
module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  updateUser,
  changeUserAccount,
  deleteUser,
  subscribe
}