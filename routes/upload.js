const { Router } = require("express");
const { uploadFile } = require("../controllers/uploadFile.controller");

const routers = Router();
routers.get("/", uploadFile);

module.exports = routers;
