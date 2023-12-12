const { Router } = require("express");
const { check } = require("express-validator");
const {
  rolValidateDb,
  emailExist,
  existUserById,
} = require("../helpers/db-validators");
const { validateFields } = require("../middlewares/validate-fields");
const {
  userGet,
  userPut,
  userPost,
  userDelete,
  userPatch,
} = require("../controllers/user.controller");
const { validateJWT } = require("../middlewares/validate-jwt");
const router = Router();

router.get("/", userGet);

router.put(
  "/:id",
  [
    check("id", "Not is a valid ID").isMongoId(),
    check("id").custom(existUserById),
    check("rol").custom(rolValidateDb),
  ],
  userPut
);
router.post(
  "/",
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
    validateJWT,
    check("id", "Not is a valid ID").isMongoId(),
    check("id").custom(existUserById),
    validateFields,
  ],
  userDelete
);
router.patch("/:id", userPatch);

module.exports = router;
