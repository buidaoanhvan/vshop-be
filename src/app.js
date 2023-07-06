const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const app = express();
const logger = require("./utils/logger.util");

const errorHandling = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    code: "50",
    message: "Server error",
  });
};
app.use(express.static("public"));
app.use(express.json());
app.use("/favicon.ico", express.static("images/favicon.ico"));
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));
app.use(cors());
app.use("/", require("./routers/index"));
app.use(errorHandling);

module.exports = app;
