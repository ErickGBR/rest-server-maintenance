const { Router } = require("express");
const { search } = require("../controllers/search.controller");
const { validateJWT } = require("../middlewares");

const router = Router();

router.get("/:collection/:term", [validateJWT], search);

module.exports = router;
