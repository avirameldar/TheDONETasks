const express = require("express")
const { handleError } = require("../../middleware/handleError")
const normalizeUser = require("../helpers/normalizeUser")
const auth = require("../../auth/authService")
const {
  registerUser,
  loginUser,
  getUsers,
  getUser,
  updateUser,
  changeUserAccount,
  deleteUser,
  subscribe,
} = require("../models/usersAccessDataService")
const {
  validateRegistration,
  validateLogin,
} = require("../validation/userValidationService")
const { generateUserPassword } = require("../helpers/bcrypt")

const router = express.Router()

router.post("/", async (req, res) => {
  try {
    let user = req.body
    const validationError = validateRegistration(user)

    if (validationError.error) {
      const { error } = validationError
      return handleError(res, 400, `Joi Error: ${error.details[0].message}`)
    }

    const token = await registerUser(user)

    return res.status(201).send(token)
  } catch (error) {
    return handleError(res, error.status || 500, error.message)
  }
})

router.post("/login", async (req, res) => {
  try {
    let user = req.body
    const validationError = validateLogin(user)

    const token = await loginUser(user)
    return res.send(token)
  } catch (error) {
    return handleError(res, error.status || 500, error.message)
  }
})

router.get("", async (req, res) => {
  try {
    const users = await getUsers()

    return res.send(users)
  } catch (error) {
    return handleError(res, error.status || 500, error.message)
  }
})

router.get("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params
    let _id = req.user._id
    const user = await getUser(id)
    return res.send(user)
  } catch (error) {
    return handleError(res, error.status || 500, error.message)
  }
})

// creayte subscribe route to premium user

router.post("/subscribe", auth, async (req, res) => {
  try {
    const user = req.user

    const subscribeUser = await subscribe(user._id)
    return res.send(subscribeUser)
  } catch (error) {
    return handleError(res, error.status || 500, error.message)
  }
})

router.put("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params
    let user = req.body
    let userInfo = req.user
    if (!userInfo.isAdmin && userInfo._id != id) {
      handleError(
        res,
        403,
        "You can not edit user details if its not you or you not admin"
      )
    }
    user = normalizeUser(user)
    user = await updateUser(id, user)
    return res.send(user)
  } catch (error) {
    return handleError(res, error.status || 500, error.message)
  }
})

router.patch("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params
    let userInfo = req.user
    if (!userInfo.isAdmin && userInfo._id != id) {
      handleError(
        res,
        403,
        "You can not edit user details if its not you or you not admin"
      )
    }
    const user = await changeUserAccount(id)
    return res.send(user)
  } catch (error) {
    return handleError(res, error.status || 500, error.message)
  }
})

router.delete("/:id", auth, async (req, res) => {
  try {
    const { id } = req.params
    let userInfo = req.user
    if (userInfo._id != id) {
      handleError(
        res,
        403,
        "You can not delete user if its not you or you not admin"
      )
    }
    const userDeleted = await deleteUser(id)
    return res.send(userDeleted)
  } catch (error) {
    return handleError(res, error.status || 500, error.message)
  }
})

module.exports = router
