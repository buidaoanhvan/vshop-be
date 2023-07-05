const express = require("express");
const router = express.Router();
require("express-async-errors");
const AuthController = require("../controllers/AuthController");
const { checkSchema } = require("express-validator");
const authenticateJWT = require("../middlewares/auth");
const { upload } = require("../middlewares/upload");

const loginValidatorSchema = {
  email: {
    isEmail: true,
    notEmpty: true,
  },
  password: {
    notEmpty: true,
  },
};

router.post(
  "/v1/api/auth/login",
  checkSchema(loginValidatorSchema),
  AuthController.login
);

router.use("/v1/api", authenticateJWT, require("../routers/auth/index"));
router.use("/v1/api", authenticateJWT, require("../routers/codex/index"));
router.use("/v1/api", authenticateJWT, require("../routers/shop/index"));
router.use("/v1/api", authenticateJWT, require("../routers/voucher/index"));
router.post(
  "/v1/api/upload",
  authenticateJWT,
  upload.single("file"),
  (req, res) => {
    const url = process.env.PUBLIC_URL + "/img/" + req.file.filename;
    return res.status(200).json({ code: "00", url });
  }
);

module.exports = router;
