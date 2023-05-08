const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class RoleService {
  static getRole = async (guard_name) => {
    return await prisma.roles.findFirst({ where: { guard_name } });
  };
  
  static getRoleId = async (id) => {
    return await prisma.roles.findFirst({ where: { id } });
  };
}

module.exports = RoleService;
