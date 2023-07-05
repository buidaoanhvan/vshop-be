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

  //Get Shop All
  static getAllShopService = async () => {
    const data = await prisma.shops.findMany();
    return {
      code: "00",
      message: "Get All Shop Success",
      data,
    };
  };

  static getShopById = async (id) => {
    try {
      const shop = await prisma.shops.findUnique({
        where: { id: parseInt(id) },
      });
      return {
        code: "00",
        message: "Get Shop by ID Success",
        data: shop,
      };
    } catch (error) {
      console.log(error);
    }
  };

  static searchShopByName = async (name) => {
    try {
      const shops = await prisma.shops.findMany({
        where: {
          name: {
            contains: name
          },
        },
      });
      return {
        code: "00",
        message: "Search Shops by Name Success",
        data: shops,
      };
    } catch (error) {
      console.log(error);
    }
  };

  // Update Shop aa
  static update = async (id, name, logo, address, status) => {
    try {
      const shop = await prisma.shops.update({
        where: { id: parseInt(id) },
        data: {
          name,
          logo,
          address,
          status,
        },
      });
      return {
        code: "00",
        message: "Shop update success!",
        data: shop,
      };
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = ShopService;
