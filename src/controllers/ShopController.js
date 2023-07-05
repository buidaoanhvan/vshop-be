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

  getShopById = async (req, res, next) => {
    const { id } = req.params;
    const shop = await ShopService.getShopById(id);
    res.status(200).json(shop);
  };

  searchShopByName = async (req, res, next) => {
    const { name } = req.params;
    const shops = await ShopService.searchShopByName(name);
    res.status(200).json(shops);
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

    const { name, logo, address, status } = req.body;

    const data = await ShopService.update(id, name, logo, address, status);
    res.status(200).json(data);
  };
}

module.exports = new ShopController();
