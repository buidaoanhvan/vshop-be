const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { findUserEmail, createdUser } = require("./UserService");
const { getRole } = require("./RoleService");
const lodash = require("lodash");
class ShopService {
  static createdShopService = async ({
    email,
    password,
    fullname,
    phone,
    shop_name,
    shop_logo,
    shop_address,
  }) => {
    //check user shop
    const checkUser = await findUserEmail(email);
    if (checkUser) {
      return { code: "01", message: "User already registered" };
    }
    //created shop
    const infoShop = await prisma.shops.create({
      data: {
        name: shop_name,
        logo: shop_logo,
        address: shop_address,
        status: 1,
      },
    });
    //get role SHOP
    const shopRole = await getRole("SHOP");
    //created user shop
    const userShop = await createdUser(
      email,
      password,
      fullname,
      phone,
      1,
      shopRole.id,
      infoShop.id
    );
    userShop.password = password;
    return {
      code: "00",
      message: "Shop created ok",
      data: {
        user: lodash.pick(userShop, ["email", "password", "fullname", "phone"]),
        shop: lodash.pick(infoShop, ["name", "logo", "address"]),
      },
    };
  };
}

module.exports = ShopService;
