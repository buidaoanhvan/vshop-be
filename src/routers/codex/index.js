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

router.post(
  "/code/create",
  checkSchema(codexCreateValidatorSchema),
  CodexController.create
);
router.get("/code/view", CodexController.view);
router.post("/code/qrcode", CodexController.generateQRCode);

module.exports = router;
