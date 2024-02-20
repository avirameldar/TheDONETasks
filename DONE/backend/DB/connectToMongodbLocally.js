const mongoose = require("mongoose");
require("dotenv").config();
const chalk = require("chalk");
const url = "mongodb://127.0.0.1:27017/projects-api";
mongoose
  .connect(url)
  .then(() => console.log("connected to MongoDb Locally!"))
  .catch((error) => console.log(`could not connect to mongoDb: ${error}`));
