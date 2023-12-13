const validateFields = require("../middlewares/validate-fields");
const validateJWT = require("../middlewares/validate-jwt");
const validateRol = require("../middlewares/validate-rol");

module.exports = {
    ...validateFields,
    ...validateJWT,
    ...validateRol
}