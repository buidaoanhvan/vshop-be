const router = require("../routers/voucher");
const VoucherService = require("../services/VoucherService");
const { validationResult } = require("express-validator");

class VoucherController {
    create = async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                code: "04",
                message: "Invalid value",
                data: errors.array(),
            });
        }
        try {
            const data = await VoucherService.create(req.body);
            res.status(200).json(data);
        } catch (errors) {
            res.status(201).json("Lỗi exception");
            console.log(errors);
        }

    };

    view = async (req, res, next) => {
        try {
            const data = await VoucherService.view();
            res.status(200).json(data);
        } catch (errors) {
            res.status(201).json("Lỗi exception");
            console.log(errors);
        }

    };

    update = async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                code: "04",
                message: "Invalid value",
                data: errors.array(),
            });
        }
        const { id } = req.params;

        const { shop_id, title, description, image, status,
            discount_value, discount_type, max_discount,
            start_time, end_time } = req.body;
        try {
            const data = await VoucherService.update(id, shop_id, title, description, image, status,
                discount_value, discount_type, max_discount, start_time, end_time);
            res.status(200).json(data);
        } catch (errors) {
            res.status(201).json("Lỗi exception");
            console.log(errors);
        }

    };

    // delete = async (req, res, next) => {
    //     try {
    //         const errors = validationResult(req);
    //         if (!errors.isEmpty()) {
    //             return res.status(400).json({
    //                 code: "04",
    //                 message: "Invalid value",
    //                 data: errors.array(),
    //             });
    //         }
    //         const { id } = req.params;
    //         const data = await VoucherService.delete(id);
    //         res.status(200).json(data);
    //     } catch (errors) {
    //         res.status(201).json("Lỗi exception");
    //         console.log(errors);
    //     }

    // };


}

module.exports = new VoucherController();