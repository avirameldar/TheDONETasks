const { format } = require("date-fns");
const { v4: uuid } = require("uuid");
const fs = require("fs");
const fsPromises = require("fs").promises;
const path = require("path");
const chalk = require("chalk");
const morganLogger = require("./loggers/morganLogger");
require("dotenv").config();
const LOGGER = process.env.LOGGER;

let usedLogger;
if (LOGGER === "morgan") {
  usedLogger = morganLogger;
}

const logEvents = async (message, logFileName) => {
  const dateTime = `${format(new Date(), "yyyyMMdd\tHH:mm:ss")}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

  try {
    if (!fs.existsSync(path.join(__dirname, "..", "logger/logs"))) {
      await fsPromises.mkdir(path.join(__dirname, "..", "logger/logs"));
    }
    await fsPromises.appendFile(
      path.join(__dirname, "..", "logger/logs", logFileName),
      logItem
    );
  } catch (err) {
    console.log(err);
  }
};

const logger = (req, res, next) => {
  logEvents(`${req.method}\t ${req.url}\t${req.headers.origin}`, "reqLog.logs");
  console.log(chalk.bgYellow(`${req.method} ${req.path}`));
  next();
};

module.exports = { usedLogger, logEvents, logger };