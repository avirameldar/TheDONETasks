const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    require: true
  },
  description: {
    type: String,
    require: false,
  },
  title: {
    type: String,
    require: true,
  },
  public: {
    type: Boolean,
    default: false
  },
  done: {
    type: Boolean,
    default: false,
  },
  pin: {
    type: Boolean,
    default: false
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
},
  {
    timestamps: true,
  }
)

const Task = mongoose.model("Task", taskSchema)
module.exports = Task
