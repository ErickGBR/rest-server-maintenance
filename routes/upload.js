const { Router } = require("express");
const { check } = require("express-validator");
const { uploadFiles, updateImage } = require("../controllers/uploadFile.controller");
const { validateFields } = require("../middlewares");
const { collectionsPermited } = require("../helpers");

const routers = Router();
routers.post("/", uploadFiles);
routers.put("/:collection/:id", [
    check('id', 'the id is a mingoo db').isMongoId(),
    check("collection").custom(c => collectionsPermited(c, ['users', 'products'])),
    validateFields
], updateImage);

module.exports = routers;
