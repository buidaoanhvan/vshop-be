const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");

async function seedDB() {
  const checkADMIN = await prisma.roles.findFirst({
    where: { guard_name: "ADMIN" },
  });
  if (checkADMIN) {
    console.log("ADMIN ROLE EXIT");
    return;
  }
  const roleADMIN = await prisma.roles.create({
    data: { name: "admin", guard_name: "ADMIN" },
  });
  console.log(roleADMIN);

  const checkSHOP = await prisma.roles.findFirst({
    where: { guard_name: "SHOP" },
  });
  if (checkSHOP) {
    console.log("SHOP ROLE EXIT");
    return;
  }
  const roleSHOP = await prisma.roles.create({
    data: { name: "shop", guard_name: "SHOP" },
  });
  console.log(roleSHOP);
  const userADMIN = await prisma.users.create({
    data: {
      email: "anhvan@gmail.com",
      password: await bcrypt.hash("123456a@A", 10),
      fullname: "Bùi Đào Anh Văn",
      phone: "0366913853",
      role_id: roleADMIN.id,
      status: 1,
    },
  });
  delete userADMIN.password;
  console.log(userADMIN);
}

seedDB();
