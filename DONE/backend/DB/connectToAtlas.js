const mongoose = require("mongoose");
require("dotenv").config();
const chalk = require("chalk");

const userName = process.env.ATLAS_USER_NAME;
const password = process.env.ATLAS_PASSWORD;

mongoose
  .connect(
    `mongodb+srv://${userName}:${password}@cluster0.twlhtwx.mongodb.net/DoneDB`
  )
  .then(() => console.log(chalk.bgGreen("Database Connected 😃")))
  .catch((err) => console.log(` O No...Something went wrong 😭 - ${err}`));
