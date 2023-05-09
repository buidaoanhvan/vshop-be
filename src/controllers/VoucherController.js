// const { saveImages } = require("../middlewares/upload");
const router = require("../routers/voucher");
const RoleService = require("../services/RoleService");
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
    const data = await VoucherService.create(req.body);
    res.status(200).json(data);
  };

  view = async (req, res, next) => {
    console.log(req.user);
    const checkRole = await RoleService.getRoleId(req.user.role_id);
    console.log(checkRole);
    if (checkRole.guard_name == "ADMIN") {
      const dataAll = await VoucherService.viewAll();
      res.status(200).json(dataAll);
    } else {
      const dataByShopId = await VoucherService.viewByShopId(req.user.shop_id);
      res.status(200).json(dataByShopId);
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

    const {
      shop_id,
      title,
      description,
      image,
      status,
      discount_value,
      discount_type,
      max_discount,
      start_time,
      end_time,
    } = req.body;

    const data = await VoucherService.update(
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
    );
    res.status(200).json(data);
  };
}

module.exports = new VoucherController();
