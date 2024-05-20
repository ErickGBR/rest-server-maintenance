const { Router } = require("express");
const { uploadFiles } = require("../controllers/uploadFile.controller");

const routers = Router();
routers.post("/", uploadFiles);

module.exports = routers;
