const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const compression = require("compression");
const app = express();

app.use(express.json());
app.use("/favicon.ico", express.static("images/favicon.ico"));
app.use(helmet());
app.use(compression());
app.use(morgan("dev"));

app.use("/", require("./routers/index"));

module.exports = app;
