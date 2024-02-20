const express = require("express")
const { handleError } = require("../../middleware/handleError")
const {
  createTask,
  getTasks,
  getMyTasks,
  getTask,
  updateTask,
  deleteTask,
  createSysTask,
  pullTask,
  completeTask,
  restoreTask
} = require("../models/tasksAccessDataService")
const auth = require("../../auth/authService")
const router = express.Router()

router.get("/", async (req, res) => {
  try {
    const tasks = await getTasks()
    return res.send(tasks)
  } catch (err) {
    return handleError(res, err.status || 500, err.message)
  }
})

router.get("/tasks/:id", auth, async (req, res) => {
  try {
    const _id = req.params.id
   
    const task = await getMyTasks(_id)
    return res.send(task)
  } catch (error) {
    return handleError(res, error.status || 500, error.message)
  }
})

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const task = await getTask(id)
    return res.send(task)
  } catch (error) {
    return handleError(res, error.status || 500, error.message)
  }
})

router.post("/", auth, async (req, res) => {
  try {
    let task = req.body

    task = await createTask(task)
    return res.status(201).send(task)
  } catch (error) {
    return handleError(res, error.status || 500, error.message)
  }
})

router.post("/sys", auth, async (req, res) => {
  try {
    let task = req.body

    task = await createSysTask(task)
    return res.status(201).send(task)
  } catch (error) {
    return handleError(res, error.status || 500, error.message)
  }
})

router.put("/:id", auth, async (req, res) => {
  try {
    let task = req.body
    const taskId = req.params.id

    task = await updateTask(taskId, task)
    return res.send(task)
  } catch (error) {
    return handleError(res, error.status || 500, error.message)
  }
})

router.patch("/:id", auth, async (req, res) => {
  try {
    const taskId = req.params.id
    const userId = req.user._id


    const task = await starTask(taskId, userId)
    return res.send(task)
  } catch (error) {
    return handleError(res, error.status || 500, error.message)
  }
})

router.patch("/pull/:id/:user_id", auth, async (req, res) => {
  try {
    const task_id = req.params.id
    const user_id = req.params.user_id

    const task = await pullTask(task_id, user_id)
    return res.send(task)
  } catch (error) {
    return handleError(res, error.status || 500, error.message)
  }
})

router.patch("/complete/:task_id/:user_id", auth, async (req, res) => {
  try {
    const task_id = req.params.task_id
    const user_id = req.params.user_id

    const task = await completeTask(task_id, user_id)
    return res.send(task)
  } catch (error) {
    return handleError(res, error.status || 500, error.message)
  }
})

router.patch("/restore/:task_id", auth, async (req, res) => {
  try {
    const task_id = req.params.task_id

    const task = await restoreTask(task_id)
    return res.send(task)
  } catch (error) {
    return handleError(res, error.status || 500, error.message)
  }
})

router.delete("/:id", auth, async (req, res) => {
  try {
    const taskId = req.params.id
    const user = req.user
    const task = await deleteTask(taskId, user)
    return res.send(task)
  } catch (error) {
    return handleError(res, error.status || 500, error.message)
  }
})

module.exports = router
