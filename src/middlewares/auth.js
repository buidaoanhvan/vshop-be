const { accessTokenVerify } = require("../utils/auth.util");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const authenticateJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    try {
      const token = authHeader.split(" ")[1];
      const payLoad = await accessTokenVerify(token, process.env.PUBLIC_KEY);
      const user = await prisma.users.findFirst({
        where: {
          id: payLoad.ixd,
        },
      });
      if (user.status == 1) {
        req.user = user;
        next();
      } else {
        res.status(403).json({ code: "42", message: "Account is locked" });
      }
    } catch (error) {
      res.status(403).json({ code: "43", message: "Forbidden" });
    }
  } else {
    res.status(401).json({ code: "41", message: "Forbidden" });
  }
};

module.exports = authenticateJWT;
