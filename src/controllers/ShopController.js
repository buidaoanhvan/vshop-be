const ShopService = require("../services/ShopService");
const { validationResult } = require("express-validator");

class ShopController {
  createdShop = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        code: "04",
        message: "Invalid value",
        data: errors.array(),
      });
    }
    const data = await ShopService.createdShopService();
    res.status(200).json(data);
  };
}

module.exports = new ShopController();
