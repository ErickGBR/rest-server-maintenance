const { Router } = require("express");
const { check } = require("express-validator");
const { userAuth, googleAuth } = require("../controllers/auth.controller");
const { validateFields } = require("../middlewares");

const router = Router();
router.post(
  "/login",
  [
    check("email", "Email is not valid").isEmail(),
    check("password", "Password is required").not().isEmpty(),
    validateFields,
  ],
  userAuth
);


router.post(
    "/google",
    [
      check("id_token", "Id token is required").not().isEmpty(),
      validateFields,
    ],
    googleAuth
  );

module.exports = router;
