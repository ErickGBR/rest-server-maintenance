const { Router } = require("express");
const { check } = require("express-validator");
const {
  rolValidateDb,
  emailExist,
  existUserById,
} = require("../helpers/db-validators");

const {
  validateFields,
  validateJWT,
  //adminRol,
  takeARol,
} = require("../middlewares");

const {
  userGet,
  userPut,
  userPost,
  userDelete,
  userPatch,
} = require("../controllers/user.controller");
const router = Router();

router.get("/", [validateJWT], userGet);

router.put(
  "/:id",
  [
    validateJWT,
    check("id", "Not is a valid ID").isMongoId(),
    check("id").custom(existUserById),
    check("rol").custom(rolValidateDb),
  ],
  userPut
);
router.post(
  "/",
  validateJWT,
  check("name", "Name is required").not().isEmpty(),
  check("password", "Password is required").isLength({ min: 6 }),
  check("email").custom(emailExist),
  check("rol").custom(rolValidateDb),
  validateFields,
  userPost
);
router.delete(
  "/:id",
  [
    //adminRol,
    validateJWT,
    takeARol("admin", "user"),
    check("id", "Not is a valid ID").isMongoId(),
    check("id").custom(existUserById),
    validateFields,
  ],
  userDelete
);

router.patch("/:id", [validateJWT], userPatch);

module.exports = router;
