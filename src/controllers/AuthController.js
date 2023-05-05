const AuthService = require("../services/AuthService");

class AuthController {
    // register
  register = async (req, res, next) => {
    const data = await AuthService.registerService(req.body);
    res.status(200).json(data);
  };

  // login
  login = async (req, res, next) => {
    const data = await AuthService.loginService(req.body);
    res.status(200).json(data);
  };
}
module.exports = new AuthController();
