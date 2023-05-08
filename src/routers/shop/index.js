const express = require("express");
const router = express.Router();
const ShopController = require("../../controllers/ShopController");
const { checkSchema } = require("express-validator");

const { isAdmin } = require("../../middlewares/authorize");

const createdShopValidatorSchema = {
  email: {
    isEmail: true,
    notEmpty: true,
  },
  password: {
    isStrongPassword: true,
    notEmpty: true,
  },
  fullname: {
    notEmpty: true,
  },
  phone: {
    notEmpty: true,
  },
  shop_name: {
    notEmpty: true,
  },
  shop_logo: {
    notEmpty: true,
  },
  shop_address: {
    notEmpty: true,
  },
};

router.post(
  "/shop",
  isAdmin,
  checkSchema(createdShopValidatorSchema),
  ShopController.createdShop
);

module.exports = router;
