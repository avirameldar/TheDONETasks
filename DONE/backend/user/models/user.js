const mongoose = require("mongoose")
const { generateUserPassword } = require("../helpers/bcrypt")

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add a name"],
    },
    email: {
      type: String,
      required: [true, "Please add an email address"],
      lowercase: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      require: [true, "Please enter a password"],
      minLength: [6, "Password must be at least 6 characters"],
      maxLength: [256, "Password must not be more than 256 characters"],
      trim: true,
    },

    premiumUser: {
      type: Boolean,
      default: false,
    },

    isSysAdmin: {
      type: Boolean,
      default: false
    },

    joinedAt: {
      type: Date,
      default: Date.now,
    }
  },
  {
    timestamps: true,
  }
)

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next()
  }

  this.password = generateUserPassword(this.password)
  next()
})

const User = mongoose.model("User", userSchema)
module.exports = User
