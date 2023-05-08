const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

class UserService {
  static findUserEmail = async (email) => {
    return await prisma.users.findFirst({ where: { email } });
  };

  static createdUser = async (
    email,
    password,
    fullname,
    phone,
    status,
    role_id,
    shop_id = null
  ) => {
    const hashPassword = await bcrypt.hash(password, 10);
    return await prisma.users.create({
      data: {
        email,
        password: hashPassword,
        fullname,
        phone,
        status,
        role_id,
        shop_id,
      },
    });
  };
}

module.exports = UserService;
