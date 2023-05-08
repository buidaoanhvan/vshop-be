const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const { createTokens } = require("../utils/auth.util");
const lodash = require("lodash");
class AuthService {
  //Register user
  static registerService = async ({ email, password, fullname, phone }) => {
    const isUser = await prisma.users.findFirst({ where: { email } });
    if (isUser) {
      return { code: "01", message: "User already registered" };
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await prisma.users.create({
      data: {
        email,
        password: hashPassword,
        fullname,
        phone,
        status: 1,
        role_id: 1,
      },
    });

    return {
      code: "00",
      message: "User created successfully",
      data: lodash.pick(user, ["email", "fullname", "phone"]),
    };
  };

  //Login user
  static loginService = async ({ email, password }) => {
    const isUser = await prisma.users.findFirst({ where: { email } });
    if (!isUser) {
      return { code: "01", message: "Email notValid" };
    }

    const comparePass = await bcrypt.compare(password, isUser.password);
    if (comparePass === false) {
      return { code: "02", message: "Password notValid" };
    } else {
      const { accessToken, refreshToken } = await createTokens(
        {
          enu: isUser.email,
          nru: isUser.fullname,
          phu: isUser.phone,
          ixd: isUser.id,
          iad: isUser.role_id,
        },
        process.env.PUBLIC_KEY
      );
      return {
        code: "00",
        message: "Login ok",
        data: lodash.pick(isUser, ["email", "fullname", "phone"]),
        token: { accessToken, refreshToken },
      };
    }
  };
}

module.exports = AuthService;
