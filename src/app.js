const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const app = express();
const logger = require("./utils/logger.util");
var cors = require('cors');
app.use(cors());
const errorHandling = (err, req, res, next) => {
  logger.error(
    `${err.status || 500} - ${req.user?.email} - ${err.message} - ${
      req.originalUrl
    } - ${req.method} - ${req.ip}`
  );
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
app.use("/", require("./routers/index"));
app.use(errorHandling);

module.exports = app;
