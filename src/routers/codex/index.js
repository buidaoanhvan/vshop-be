const express = require("express");
const router = express.Router();
const { checkSchema } = require("express-validator");
const CodexController = require("../../controllers/CodexController");

const codexCreateValidatorSchema = {
  voucher_id: {
    notEmpty: true,
    isNumeric: true,
  },
  quantity: {
    notEmpty: true,
    isNumeric: true,
  },
};

const codexViewValidatorSchema = {
  voucher_id: {
    notEmpty: true,
    isNumeric: true,
  },
};

const codexDetailValidatorSchema = {
  codex: {
    notEmpty: true,
    isNumeric: true,
  },
};

router.post(
  "/code/create",
  checkSchema(codexCreateValidatorSchema),
  CodexController.create
);

router.post(
  "/code/view",
  checkSchema(codexViewValidatorSchema),
  CodexController.view
);

router.post("/code/detail");

router.post("/code/used");

router.post("/code/qrcode", CodexController.generateQRCode);

module.exports = router;
