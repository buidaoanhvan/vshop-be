const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

class AuthService {
    //register user
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

    return { code: "00", message: "User created successfully", data: user };
  };
}

module.exports = AuthService;
