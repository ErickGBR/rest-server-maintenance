const { validationResult } = require("express-validator")

const validateFields = (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({
        status: false,
        msg: "POST API - controller",
        errors
      });
    }

    next();
}

module.exports = {
    validateFields
}