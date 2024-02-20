const express = require("express");
const chalk = require("chalk");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
require("dotenv").config();
const connectToDb = require("./DB/dbService");
const handleError = require("./middleware/handleError");
const { logger } = require("./logger/loggerService");
const router = require("./routes/router");

const app = express();
app.use(logger);
app.use(express.json());
app.use(cors(corsOptions));
app.use(router);

//Error Handler
app.use((err, req, res, next) => {
  handleError(res, 500, "Internal error " + err.message);
});

// Connect to the server and to the database
const PORT = process.env.PORT || 5010;
app.listen(PORT, () => {
  console.log(chalk.bgGray.blueBright.bold(`Server running on port ${PORT}`));
  connectToDb();
});
