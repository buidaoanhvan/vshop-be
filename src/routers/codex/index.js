const express = require("express");
const router = express.Router();
const { checkSchema } = require("express-validator");
const CodexController = require("../../controllers/CodexController");

const codexValidatorSchema = {
    voucher_id: {
        notEmpty: true,
    },
    codex: {
        notEmpty: true,
    },

    phone: {
        notEmpty: true,
    }
};

router.post("/code/create",
    // checkSchema(codexValidatorSchema),
    CodexController.create
);
router.get("/code/view", CodexController.view);
router.post("/code/qrcode", CodexController.generateQRCode);


module.exports = router;