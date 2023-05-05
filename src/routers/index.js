const express = require("express");
const router = express.Router();

router.use("/v1/api", (req, res) => {
  return res.status(200).json({
    message: "ok",
  });
});

module.exports = router;
