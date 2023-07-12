const express = require("express");
const router = express.Router();
const ShopController = require("../../controllers/ShopController");
const { checkSchema, param } = require("express-validator");

const { isAdmin } = require("../../middlewares/authorize");

const createdShopValidatorSchema = {
  email: {
    isEmail: true,
    errorMessage: "Vui lòng kiểm tra email",
  },
  password: {
    notEmpty: true,
    errorMessage: "Vui lòng kiểm tra mật khẩu",
  },
  fullname: {
    notEmpty: true,
    errorMessage: "Vui lòng kiểm tra họ tên",
  },
  phone: {
    notEmpty: true,
    errorMessage: "Vui lòng kiểm tra số điện thoại",
  },
  shop_name: {
    notEmpty: true,
    errorMessage: "Vui lòng kiểm tra tên cửa hàng",
  },
  shop_logo: {
    notEmpty: true,
    errorMessage: "Vui lòng tải hình ảnh cửa hàng",
  },
  shop_address: {
    notEmpty: true,
    errorMessage: "Vui lòng kiểm tra địa chỉ cửa hàng",
  },
};

const updateShopValidatorSchema = {
  name: {
    notEmpty: true,
    errorMessage: "Vui lòng kiểm tra lại tên cửa hàng",
  },
  logo: {
    notEmpty: true,
    errorMessage: "Vui lòng kiểm tra lại hình ảnh",
  },
  address: {
    notEmpty: true,
    errorMessage: "Vui lòng kiểm tra lại địa chỉ",
  },
  status: {
    notEmpty: true,
    errorMessage: "Vui lòng kiểm tra trạng thái",
  },
};

router.post(
  "/shop",
  isAdmin,
  checkSchema(createdShopValidatorSchema),
  ShopController.createdShop
);

router.get("/shop", ShopController.allShop);

router.get("/shop/:id", ShopController.getShopById); // Added route for getting shop by ID

router.get("/shop/search/:name", ShopController.searchShopByName); // New route for searching shop by name

router.patch(
  "/shop/update/:id",
  checkSchema(updateShopValidatorSchema),
  ShopController.update
);

module.exports = router;
