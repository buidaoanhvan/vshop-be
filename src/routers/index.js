const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.use("/v1/api", require("../routers/auth/index"));

module.exports = router;
