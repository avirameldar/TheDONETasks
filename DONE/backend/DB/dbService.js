require("dotenv").config();
const ENVIRONMENT = process.env.ENVIRONMENT;

const connectToDb = () => {
  if (ENVIRONMENT === "development") {
    require("./mongodb/connectToMongodbLocally");
  } else if (ENVIRONMENT === "production") {
    require("./connectToAtlas");
  }
};

module.exports = connectToDb;
