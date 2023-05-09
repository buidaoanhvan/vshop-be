const express = require("express");
const router = express.Router();
const AuthController = require("../../controllers/AuthController");
const { checkSchema } = require("express-validator");

const registerValidatorSchema = {
  email: {
    isEmail: true,
    notEmpty: true,
  },
  password: {
    isStrongPassword: true,
    notEmpty: true,
  },
  fullname: {
    notEmpty: true,
  },
  phone: {
    notEmpty: true,
  },
};

router.post(
  "/auth/register",
  checkSchema(registerValidatorSchema),
  AuthController.register
);

module.exports = router;
