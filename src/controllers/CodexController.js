const { validationResult } = require("express-validator");
const CodeService = require("../services/CodeService");
const router = require("../routers/codex");

class CodeController{
    create = async(req, res) =>{
        // const errors = validationResult(req);
        // if (!errors.isEmpty()) {
        //   return res.status(400).json({
        //     code: "04",
        //     message: "Invalid value",
        //     data: errors.array(),
        //   });
        // }
        const data = await CodeService.createCode(req.body);
        res.status(200).json(data);
    };

    view = async(req, res) =>{
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({
            code: "04",
            message: "Invalid value",
            data: errors.array(),
          });
        }
        const data = await CodeService.view(req.body);
        res.status(200).json(data);
    };


}

module.exports = new CodeController();