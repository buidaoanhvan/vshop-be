const express = require("express");
const router = express.Router();
const ShopController = require("../../controllers/ShopController");
const { checkSchema, param } = require("express-validator");

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

const updateShopValidatorSchema = {
  name: {
    notEmpty: true,
  },
  logo: {
    notEmpty: true,
  },
  address: {
    notEmpty: true,
  },
  status: {
    notEmpty: true,
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
