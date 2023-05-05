const express = require("express");
const router = express.Router();
const AuthController = require('../../controllers/AuthController')

// const { PrismaClient } = require("@prisma/client");
// const prisma = new PrismaClient();

router.post("/auth/register", AuthController.register);
router.get("/auth/login", AuthController.login);

module.exports = router;
