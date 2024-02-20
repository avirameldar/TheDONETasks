const { createError } = require("../../middleware/handleError")
const mongoose = require("mongoose")
const Task = require("./task")
require("dotenv").config
const DB = process.env.DB

const createTask = async (normalizedTask) => {
  if (DB === "MONGODB") {
    try {
      let task = new Task(normalizedTask)
      task.pin = false
      task.done = false
      task.user_id = new mongoose.Types.ObjectId(task.user_id)


      await task.save()
      return task
    } catch (err) {
      return createError("Mongoose", err)
    }
  } else {
    Promise.resolve("Get tasks are not in mongodb")
  }
}

const createSysTask = async (normalizedTask) => {
  if (DB === "MONGODB") {
    try {
      let task = new Task(normalizedTask)
      task.pin = false
      task.done = false
      task.public = true

      await task.save()
      return task
    } catch (err) {
      return createError("Mongoose", err)
    }
  } else {
    Promise.resolve("Get tasks are not in mongodb")
  }
}

const pullTask = async (_id, user_id) => {
  if (DB === "MONGODB") {
    try {
      const task = await Task.findById({ _id })

      let duplicatedTask = new Task()

      duplicatedTask.user_id = new mongoose.Types.ObjectId(user_id)
      duplicatedTask._id = new mongoose.Types.ObjectId()
      duplicatedTask.public = false
      duplicatedTask.title = task.title
      duplicatedTask.description = task.description

      await duplicatedTask.save()
      return duplicatedTask
    } catch (err) {
      return createError("Mongoose", err)
    }
  } else {
    Promise.resolve("Unable to pull task from public area")
  }
}

const completeTask = async (_id, user_id) => {
  if (DB === "MONGODB") {
    try {
      let task = await Task.findByIdAndUpdate(_id, { $set: { done: true } }, {
        new: true,
      })

      return task
    } catch (err) {
      return createError("Mongoose", err)
    }
  } else {
    Promise.resolve("Unable to pull task from public area")
  }
}

const getTasks = async () => {
  if (DB === "MONGODB") {
    try {
      const tasks = await Task.find({ public: true })
      return Promise.resolve(tasks)
    } catch (err) {
      return createError("Mongoose", err)
    }
  } else {
    Promise.resolve("Get tasks are not in mongodb")
  }
}

const getTask = async (taskId) => {
  if (DB === "MONGODB") {
    try {
      const task = await Task.findById(taskId)
      if (!task) throw new Error("Could not find this task in the database")
      return Promise.resolve(task)
    } catch (err) {
      return createError("Mongoose", error)
    }
  } else {
    Promise.resolve("Get task not in mongodb")
  }
}

const getMyTasks = async (userId) => {
  if (DB === "MONGODB") {
    try {
      let tasks = await Task.find({ user_id: userId })
      return Promise.resolve(tasks)
    } catch (err) {
      return createError("Mongoose", err)
    }
  } else {
    Promise.resolve("Get my tasks are not in mongodb")
  }
}

const updateTask = async (taskId, normalizedTask) => {
  if (DB === "MONGODB") {
    try {
      let task = await Task.findByIdAndUpdate(taskId, normalizedTask, {
        new: true,
      })
      if (!task) {
        throw new Error("There is no task with this id")
      }
      return Promise.resolve(task)
    } catch (err) {
      return createError("Mongoose", err)
    }
  } else {
    Promise.resolve("Update task are not in mongodb")
  }
}

const restoreTask = async (task_id) => {
  if (DB === "MONGODB") {
    try {
      let task = await Task.findByIdAndUpdate({ _id: task_id }, { done: false }, {
        new: true,
      })


      if (!task) {
        throw new Error("There is no task with this id")
      }

      return Promise.resolve(task)
    } catch (error) {
      Promise.resolve(`Unable to restore task with given [id] ${task_id}`)
    }
  }
}

const deleteTask = async (taskId, user) => {
  if (DB === "MONGODB") {
    try {
      let task = await Task.findById(taskId)

      if (!task)
        throw new Error("A task with this ID cannot be found in the database")

      await Task.findByIdAndDelete({ _id: taskId })

      return Promise.resolve(task._id)
    } catch (err) {
      return createError("Mongoose", err)
    }
  } else {
    Promise.resolve("Delete task are not in mongodb")
  }
}

module.exports = {
  createTask,
  pullTask,
  createSysTask,
  getTasks,
  getTask,
  getMyTasks,
  completeTask,
  restoreTask,
  updateTask,
  deleteTask
}