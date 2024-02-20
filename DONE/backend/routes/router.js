const express = require("express");
const tasksRoute = require("../tasks/routes/tasksRoute");
const usersRoute = require("../user/routes/usersRoute");
const { handleError } = require("../middleware/handleError");
const router = express.Router();

router.use("/api/task", tasksRoute);
router.use("/api/user", usersRoute);

router.use((req, res) => {
  handleError(res, 404, "Page not found");
});

module.exports = router;
