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
    const data = await ShopService.createdShopService(req.body);
    res.status(200).json(data);
  };

  allShop = async (req, res, next) => {
    const data = await ShopService.getAllShopService();
    res.status(200).json(data);
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
      email,
      password,
      fullname,
      phone,
      shop_name,
      shop_logo,
      shop_address,
    } = req.body;

    const data = await ShopService.update(
      id,
      email,
      password,
      fullname,
      phone,
      shop_name,
      shop_logo,
      shop_address
    );
    res.status(200).json(data);
  };

  //Delete Shop
  deleteShop = async (req, res, next) => {
    const { id } = req.params;
    const data = await ShopService.deleteShop(id);
    res.status(200).json(data);
  };
}

module.exports = new ShopController();
