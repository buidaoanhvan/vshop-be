const AuthService = require("../services/AuthService");
const { validationResult } = require("express-validator");

class AuthController {
  // register
  register = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        code: "04",
        message: "Invalid value",
        data: errors.array(),
      });
    }
    const data = await AuthService.registerService(req.body);
    res.status(200).json(data);
  };

  // login
  login = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        code: "04",
        message: "Invalid value",
        data: errors.array(),
      });
    }
    const data = await AuthService.loginService(req.body);
    res.status(200).json(data);
  };

  // view 
  
  viewUser = async (req, res, next) => {
    const data = await AuthService.getAllUser();
    res.status(200).json(data);
  };


}
module.exports = new AuthController();
