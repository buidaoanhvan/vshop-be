const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const { createTokens } = require("../utils/auth.util");
const lodash = require("lodash");

class VoucherService {
    static view = async (req, res) => {
        const voucher = await prisma.vouchers.findMany();
        return {
            code: "00",
            message: "Vouchers is show all",
            data: voucher
        };

    };

    // create voucher
    static create = async ({ shop_id, title, description, image, status,
        discount_value, discount_type, max_discount,
        start_time, end_time }) => {

        const voucher = await prisma.vouchers.create({
            data: {
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
            },
        });
        return {
            code: "00",
            message: "Vouchers create success!",
            data: lodash.pick(voucher, ["shop_id", "title", "description",
                "image", "status", "discount_value",
                "discount_type", "max_discount",
                "start_time", "end_time"
            ]),
        };

    };
    //update 
    static update = async (id, shop_id, title, description, image, status,
        discount_value, discount_type, max_discount, start_time, end_time) => {
        const voucher = await prisma.vouchers.update({
            where: { id : parseInt(id) },
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
                end_time
            },
        });
        return {
            code: "00",
            message: "Vouchers update success!",
            data: voucher

        };

    };


    // // delete
    // static delete = async (id) => {
    //     const voucher = await prisma.vouchers.delete({
    //         where: { id : parseInt(id) },
    //     });
    //     return {
    //         code: "00",
    //         message: "Vouchers is remove",
    //         data: voucher
    //     };

    // };

}


module.exports = VoucherService;