const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
// const promMid = require("express-prometheus-middleware");
const app = express();

const logger = require("./utils/logger.util");

// app.use(
//   promMid({
//     metricsPath: "/metrics",
//     collectDefaultMetrics: true,
//     requestDurationBuckets: [0.1, 0.5, 1, 1.5],
//     requestLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
//     responseLengthBuckets: [512, 1024, 5120, 10240, 51200, 102400],
//   })
// );

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
