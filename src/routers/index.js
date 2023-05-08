const express = require("express");
const router = express.Router();
require("express-async-errors");
const AuthController = require("../controllers/AuthController");
const { checkSchema } = require("express-validator");
const authenticateJWT = require("../middlewares/auth");

const loginValidatorSchema = {
  email: {
    isEmail: true,
    notEmpty: true,
  },
  password: {
    notEmpty: true,
  },
};

router.get(
  "/v1/api/auth/login",
  checkSchema(loginValidatorSchema),
  AuthController.login
);

router.use("/v1/api", authenticateJWT, require("../routers/auth/index"));
router.use("/v1/api", authenticateJWT, require("../routers/shop/index"));

module.exports = router;
