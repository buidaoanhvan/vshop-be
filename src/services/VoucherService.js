const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const lodash = require("lodash");

class VoucherService {
  // view all
  static viewAll = async (req, res) => {
    const voucher = await prisma.vouchers.findMany({
      orderBy: [{ created_at: "desc" }],
      include: {
        shops: true,
      },
    });
    return {
      code: "00",
      message: "Vouchers is show all",
      data: voucher,
    };
  };

  // view by shop_id
  static viewByShopId = async (id) => {
    const voucher = await prisma.vouchers.findMany({
      orderBy: [{ created_at: "desc" }],
      where: { shop_id: id },
    });
    return {
      code: "00",
      message: "Vouchers off shop_id is show",
      data: voucher,
    };
  };

  // create voucher
  static create = async ({
    shop_id,
    title,
    description,
    image,
    discount_value,
    discount_type,
    max_discount,
    start_time,
    end_time,
  }) => {
    try {
      const voucher = await prisma.vouchers.create({
        data: {
          shops: { connect: { id: shop_id } },
          title,
          description,
          image,
          status: 0,
          discount_value,
          discount_type,
          max_discount,
          start_time,
          end_time,
        },
      });
      return {
        code: "00",
        message: "Vouchers create success!",
        data: lodash.pick(voucher, [
          "shop_id",
          "title",
          "description",
          "image",
          "status",
          "discount_value",
          "discount_type",
          "max_discount",
          "start_time",
          "end_time",
        ]),
      };
    } catch (error) {
      console.log(error);
    }
  };
  //update all for admin
  static update = async (
    id,
    shop_id,
    title,
    description,
    image,
    status,
    discount_value,
    discount_type,
    max_discount,
    start_time,
    end_time
  ) => {
    const voucher = await prisma.vouchers.update({
      where: { id: parseInt(id) },
      data: {
        shops: { connect: { id: shop_id } },
        title,
        description,
        image,
        status,
        discount_value,
        discount_type,
        max_discount,
        start_time,
        end_time,
      },
    });
    return {
      code: "00",
      message: "Vouchers update success!",
      data: voucher,
    };
  };
}

module.exports = VoucherService;
