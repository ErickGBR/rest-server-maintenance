const { Router } = require("express");
const { uploadFile } = require("../controllers/uploadFile.controller");

const routers = Router();
routers.post("/", uploadFile);

module.exports = routers;
